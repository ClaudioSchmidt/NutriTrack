package com.nutritrack.dto;

import lombok.Data;

@Data
public class TotalTrackingSummary {
    private float totalCalories;
    private float totalProtein;
    private float totalCarbs;
    private float totalFat;
    private float totalCo2;
    private int totalVeganMeals;
    private int totalVegetarianMeals;
    private int totalPoints;
}
