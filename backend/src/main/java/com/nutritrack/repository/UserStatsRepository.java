package com.nutritrack.repository;

import com.nutritrack.model.UserStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, Long> {
    List<UserStats> findByUserId(Long userId);

    Optional<UserStats> findByUserIdAndDate(Long userId, LocalDate date);

    @Query("SELECT SUM(us.totalCalories), SUM(us.totalProtein), SUM(us.totalCarbs), SUM(us.totalFat), SUM(us.dailyCo2Emissions), SUM(us.dailyVeganMeals), SUM(us.dailyVegetarianMeals), SUM(us.dailyPoints) FROM UserStats us WHERE us.user.id = :userId")
    List<Object[]> findTotalStatsByUserId(Long userId);
}
