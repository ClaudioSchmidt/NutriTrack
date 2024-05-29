package com.nutritrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nutritrack.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}