package com.nutritrack.dto;

import lombok.Data;

@Data
public class TrackingUpdateRequest {
    private Long portionId;
    private float quantity;
}
