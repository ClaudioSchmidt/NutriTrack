package com.nutritrack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nutritrack.model.User;
import com.nutritrack.repository.UserRepository;
import com.nutritrack.exception.ResourceNotFoundException;
import com.nutritrack.dto.UserResponse;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        User savedUser = userRepository.save(user);
        return convertToResponse(savedUser);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return convertToResponse(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, User user) {
        User updatedUser = userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setFirstName(user.getFirstName());
                    existingUser.setLastName(user.getLastName());
                    existingUser.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return convertToResponse(updatedUser);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
    }

    public List<UserResponse> searchUsers(String keyword) {
        return userRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.trim().isEmpty()) {
                String likePattern = "%" + keyword.toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("username")), likePattern));
                predicates.add(cb.like(cb.lower(root.get("firstName")), likePattern));
                predicates.add(cb.like(cb.lower(root.get("lastName")), likePattern));
                predicates.add(cb.like(cb.lower(root.get("email")), likePattern));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        }).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private UserResponse convertToResponse(User user) {
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        return userResponse;
    }
}
