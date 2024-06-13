package com.nutritrack.model;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "daily_user_stats")
@Schema(description = "Daily statistics for a user, including CO2 emissions and dietary habits")
public class UserStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the daily user statistics")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(description = "User associated with these daily statistics")
    private User user;

    @Column(nullable = false)
    @Schema(description = "Date for the statistics")
    private LocalDate date;

    @Column(nullable = false)
    @Schema(description = "Total calories consumed by the user on this day")
    private float totalCalories;

    @Column(nullable = false)
    @Schema(description = "Total protein consumed by the user on this day")
    private float totalProtein;

    @Column(nullable = false)
    @Schema(description = "Total carbs consumed by the user on this day")
    private float totalCarbs;

    @Column(nullable = false)
    @Schema(description = "Total fat consumed by the user on this day")
    private float totalFat;

    @Column(nullable = false)
    @Schema(description = "Total CO2 emissions caused by the user's food consumption on this day, in kilograms")
    private float dailyCo2Emissions;

    @Column(nullable = false)
    @Schema(description = "Total number of vegan meals consumed by the user on this day")
    private int dailyVeganMeals;

    @Column(nullable = false)
    @Schema(description = "Total number of vegetarian meals consumed by the user on this day")
    private int dailyVegetarianMeals;

    @Column(nullable = false)
    @Schema(description = "Total points accumulated by the user on this day")
    private int dailyPoints;
}
