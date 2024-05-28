package com.nutritrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nutritrack.model.User;
import com.nutritrack.respository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userID}")
    public User getUserById(@PathVariable Long userID) {
        return userRepository.findById(userID).get();
    }

    @PostMapping
    public User creatUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{userID}") // this is the path varaible
    public User updateUser(@PathVariable Long userID, @RequestBody User user) {
    User existingUser = userRepository.findById(userID).get();
    existingUser.setFirstName(user.getFirstName());
    existingUser.setLastName(user.getLastName());
    existingUser.setEmail(user.getEmail());
    return userRepository.save(existingUser);
    }

    @DeleteMapping("/{userID}")
    public String deleteUser(@PathVariable Long userID) {
        try {
            userRepository.deleteById(userID);
            return "User deleted successfully";
        } catch (Exception e) {
            return "User not found";
        }
    }

}
