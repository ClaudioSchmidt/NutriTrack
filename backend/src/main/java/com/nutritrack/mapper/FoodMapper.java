package com.nutritrack.mapper;

import com.nutritrack.dto.FoodCreateRequest;
import com.nutritrack.dto.FoodUpdateRequest;
import com.nutritrack.dto.FoodResponse;
import com.nutritrack.dto.FoodResponse.NutritionResponse;
import com.nutritrack.dto.FoodResponse.SustainabilityResponse;
import com.nutritrack.dto.FoodResponse.PortionResponse;
import com.nutritrack.dto.SimpleFoodResponse;
import com.nutritrack.model.*;

import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class FoodMapper {

    // Method for creating Food
    public Food toEntity(FoodCreateRequest foodCreateRequest, User user) {
        Food food = new Food();
        food.setTitle(foodCreateRequest.getTitle());
        food.setBrand(foodCreateRequest.getBrand());
        food.setCategory(foodCreateRequest.getCategory());
        food.setLiquid(foodCreateRequest.isLiquid());

        // Create and set nutrition and sustainability information
        food.setNutrition(toNutrition(foodCreateRequest.getNutrition(), food));
        food.setSustainability(toSustainability(foodCreateRequest.getSustainability(), food));

        // Create portions
        food.setPortions(foodCreateRequest.getPortions().stream().map(portionRequest -> {
            Portion portion = new Portion();
            portion.setLabel(portionRequest.getLabel());
            portion.setQuantity(portionRequest.getQuantity());
            portion.setFood(food);
            return portion;
        }).collect(Collectors.toList()));

        // Set the user reference
        food.setUser(user);
        food.setDeactivated(false);

        return food;
    }

    // Method for updating Food
    public Food toEntity(FoodUpdateRequest foodUpdateRequest, User user, Food existingFood) {
        existingFood.setTitle(foodUpdateRequest.getTitle());
        existingFood.setBrand(foodUpdateRequest.getBrand());
        existingFood.setCategory(foodUpdateRequest.getCategory());
        existingFood.setLiquid(foodUpdateRequest.isLiquid());

        // Update nutrition and sustainability information
        existingFood.setNutrition(toNutrition(foodUpdateRequest.getNutrition(), existingFood));
        existingFood.setSustainability(toSustainability(foodUpdateRequest.getSustainability(), existingFood));

        // Update or add portions
        for (FoodUpdateRequest.PortionUpdateRequest portionRequest : foodUpdateRequest.getPortions()) {
            Portion portion;
            if (portionRequest.getId() != null) {
                portion = existingFood.getPortions().stream()
                        .filter(p -> p.getId().equals(portionRequest.getId()))
                        .findFirst()
                        .orElse(new Portion());
            } else {
                portion = new Portion();
            }

            portion.setLabel(portionRequest.getLabel());
            portion.setQuantity(portionRequest.getQuantity());
            portion.setFood(existingFood);

            if (portion.getId() == null) {
                existingFood.getPortions().add(portion);
            }
        }

        // Set the user reference
        existingFood.setUser(user);

        // Update deactivation status
        existingFood.setDeactivated(foodUpdateRequest.isDeactivated());

        return existingFood;
    }

    // Method to convert Food entity to FoodResponse DTO
    public FoodResponse toResponse(Food food) {
        FoodResponse foodResponse = new FoodResponse();
        foodResponse.setId(food.getId());
        foodResponse.setTitle(food.getTitle());
        foodResponse.setBrand(food.getBrand());
        foodResponse.setCategory(food.getCategory());
        foodResponse.setDeactivated(food.isDeactivated());
        foodResponse.setLiquid(food.isLiquid());

        // Map nutrition and sustainability information
        foodResponse.setNutrition(toNutritionResponse(food.getNutrition()));
        foodResponse.setSustainability(toSustainabilityResponse(food.getSustainability()));

        // Map portions
        foodResponse.setPortions(food.getPortions().stream().map(portion -> {
            PortionResponse portionResponse = new PortionResponse();
            portionResponse.setId(portion.getId());
            portionResponse.setLabel(portion.getLabel());
            portionResponse.setQuantity(portion.getQuantity());
            return portionResponse;
        }).collect(Collectors.toList()));

        return foodResponse;
    }

    // Method to convert Food entity to SimpleFoodResponse DTO
    public SimpleFoodResponse toSimpleResponse(Food food) {
        return new SimpleFoodResponse(food.getId(), food.getTitle(), food.getBrand(), food.getCategory());
    }

    // Helper methods...

    // Helper method to create Nutrition entity
    private Nutrition toNutrition(FoodCreateRequest.NutritionRequest nutritionRequest, Food food) {
        if (nutritionRequest == null) {
            return null;
        }
        Nutrition nutrition = new Nutrition();
        nutrition.setCalories(nutritionRequest.getCalories());
        nutrition.setProtein(nutritionRequest.getProtein());
        nutrition.setCarbs(nutritionRequest.getCarbs());
        nutrition.setFat(nutritionRequest.getFat());
        nutrition.setFood(food);
        return nutrition;
    }

    // Helper method to update Nutrition entity
    private Nutrition toNutrition(FoodUpdateRequest.NutritionRequest nutritionRequest, Food food) {
        Nutrition nutrition = food.getNutrition();
        if (nutrition == null) {
            nutrition = new Nutrition();
        }
        nutrition.setCalories(nutritionRequest.getCalories());
        nutrition.setProtein(nutritionRequest.getProtein());
        nutrition.setCarbs(nutritionRequest.getCarbs());
        nutrition.setFat(nutritionRequest.getFat());
        nutrition.setFood(food);
        return nutrition;
    }

    // Helper method to create Sustainability entity
    private Sustainability toSustainability(FoodCreateRequest.SustainabilityRequest sustainabilityRequest, Food food) {
        if (sustainabilityRequest == null) {
            return null;
        }
        Sustainability sustainability = new Sustainability();
        sustainability.setCo2perKg(sustainabilityRequest.getCo2perKg());
        sustainability.setDietType(sustainabilityRequest.getDietType());
        sustainability.setFood(food);
        return sustainability;
    }

    // Helper method to update Sustainability entity
    private Sustainability toSustainability(FoodUpdateRequest.SustainabilityRequest sustainabilityRequest, Food food) {
        Sustainability sustainability = food.getSustainability();
        if (sustainability == null) {
            sustainability = new Sustainability();
        }
        sustainability.setCo2perKg(sustainabilityRequest.getCo2perKg());
        sustainability.setDietType(sustainabilityRequest.getDietType());
        sustainability.setFood(food);
        return sustainability;
    }

    // Helper method to convert Nutrition entity to NutritionResponse
    private NutritionResponse toNutritionResponse(Nutrition nutrition) {
        if (nutrition == null) {
            return null;
        }
        NutritionResponse nutritionResponse = new NutritionResponse();
        nutritionResponse.setCalories(nutrition.getCalories());
        nutritionResponse.setProtein(nutrition.getProtein());
        nutritionResponse.setCarbs(nutrition.getCarbs());
        nutritionResponse.setFat(nutrition.getFat());
        return nutritionResponse;
    }

    // Helper method to convert Sustainability entity to SustainabilityResponse
    private SustainabilityResponse toSustainabilityResponse(Sustainability sustainability) {
        if (sustainability == null) {
            return null;
        }
        SustainabilityResponse sustainabilityResponse = new SustainabilityResponse();
        sustainabilityResponse.setCo2perKg(sustainability.getCo2perKg());
        sustainabilityResponse.setDietType(sustainability.getDietType());
        return sustainabilityResponse;
    }
}