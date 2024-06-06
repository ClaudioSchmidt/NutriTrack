package com.nutritrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.nutritrack.model.User;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}