package com.nutritrack.repository;

import com.nutritrack.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByUserId(Long userId);

    List<Food> findByUserIdAndTitleContaining(Long userId, String title);

    List<Food> findByUserIdAndDeactivatedFalse(Long userId);

    List<Food> findByUserIdAndTitleContainingAndDeactivatedFalse(Long userId, String title);
}
