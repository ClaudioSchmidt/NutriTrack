package com.nutritrack.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Response DTO for tracking entry")
public class TrackingResponse {
    private Long id;
    private FoodResponse food;
    private PortionResponse portion;
    private float quantity;
    private LocalDateTime timestamp;

    @Data
    public static class FoodResponse {
        private Long id;
        private String title;
        private String brand;
        private String category;
        private boolean IsLiquid;
    }

    @Data
    public static class PortionResponse {
        private Long id;
        private String label;
        private float quantity;
    }
}