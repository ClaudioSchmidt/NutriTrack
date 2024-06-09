package com.nutritrack.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class TrackingCreateRequest {
    @Schema(required = true)
    private Long foodId;

    private Long portionId;

    @Schema(required = true)
    private float quantity;
}
