package com.nutritrack.service;

import org.springframework.stereotype.Service;

import com.nutritrack.model.User;
import com.nutritrack.repository.UserRepository;
import com.nutritrack.exception.ResourceNotFoundException;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    public User updateUser(Long id, User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setFirstName(user.getFirstName());
                    existingUser.setLastName(user.getLastName());
                    existingUser.setPassword(user.getPassword());
                    existingUser.setHeight(user.getHeight());
                    existingUser.setWeight(user.getWeight());
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
    }

    public List<User> searchUsers(String keyword) {
        return userRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null) {
                predicates.add(cb.like(root.get("username"), "%" + keyword + "%"));
                predicates.add(cb.like(root.get("firstName"), "%" + keyword + "%"));
                predicates.add(cb.like(root.get("lastName"), "%" + keyword + "%"));
                predicates.add(cb.like(root.get("email"), "%" + keyword + "%"));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        });
    }
}