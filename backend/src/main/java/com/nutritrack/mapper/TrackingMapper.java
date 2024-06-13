package com.nutritrack.mapper;

import com.nutritrack.dto.TrackingResponse;
import com.nutritrack.model.Tracking;
import org.springframework.stereotype.Component;

@Component
public class TrackingMapper {

    public TrackingResponse toResponse(Tracking tracking) {
        TrackingResponse response = new TrackingResponse();
        response.setId(tracking.getId());
        response.setQuantity(tracking.getQuantity());
        response.setTimestamp(tracking.getTimestamp());

        if (tracking.getFood() != null) {
            TrackingResponse.FoodResponse foodResponse = new TrackingResponse.FoodResponse();
            foodResponse.setId(tracking.getFood().getId());
            foodResponse.setTitle(tracking.getFood().getTitle());
            foodResponse.setBrand(tracking.getFood().getBrand());
            foodResponse.setCategory(tracking.getFood().getCategory());
            foodResponse.setIsLiquid(tracking.getFood().isLiquid());
            response.setFood(foodResponse);
        } else {
            TrackingResponse.FoodResponse foodResponse = new TrackingResponse.FoodResponse();
            foodResponse.setId(null);
            foodResponse.setTitle("Unavailable");
            foodResponse.setBrand("Unavailable");
            foodResponse.setCategory("Unavailable");
            foodResponse.setIsLiquid(false);
            response.setFood(foodResponse);
        }

        if (tracking.getPortion() != null) {
            TrackingResponse.PortionResponse portionResponse = new TrackingResponse.PortionResponse();
            portionResponse.setId(tracking.getPortion().getId());
            portionResponse.setLabel(tracking.getPortion().getLabel());
            portionResponse.setQuantity(tracking.getPortion().getQuantity());
            response.setPortion(portionResponse);
        } else {
            TrackingResponse.PortionResponse portionResponse = new TrackingResponse.PortionResponse();
            portionResponse.setId(null);
            portionResponse.setLabel(null);
            portionResponse.setQuantity(0);
            response.setPortion(portionResponse);
        }

        return response;
    }
}
