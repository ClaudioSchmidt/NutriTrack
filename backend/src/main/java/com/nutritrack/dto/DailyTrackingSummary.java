package com.nutritrack.dto;

import lombok.Data;

import java.util.List;

@Data
public class DailyTrackingSummary {
    private List<TrackingResponse> trackings;
    private DailySummary summary;

    @Data
    public static class DailySummary {
        private float totalCalories;
        private float totalProtein;
        private float totalCarbs;
        private float totalFat;
        private float totalCo2;
        private int totalVeganMeals;
        private int totalVegetarianMeals;
        private int dailyPoints;
    }
}