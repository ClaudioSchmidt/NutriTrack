package com.nutritrack.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nutritrack.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> { // Long is type of primary key, in this case the userID
    
}
