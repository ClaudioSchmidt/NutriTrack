package com.nutritrack.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "height")
    private Long height;

    @Column(name = "weight")
    private Double weight;
}