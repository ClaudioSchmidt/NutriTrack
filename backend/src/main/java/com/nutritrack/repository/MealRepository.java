package com.nutritrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nutritrack.model.Meal;

public interface MealRepository extends JpaRepository<Meal, Long> {
}