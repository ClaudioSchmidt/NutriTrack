package com.nutritrack.respository;

import com.nutritrack.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    // Define custom query methods if needed
}
