package com.nutritrack.controller;

import com.nutritrack.dto.FoodCreateRequest;
import com.nutritrack.dto.FoodResponse;
import com.nutritrack.dto.FoodUpdateRequest;
import com.nutritrack.dto.SimpleFoodResponse;
import com.nutritrack.service.FoodService;
import com.nutritrack.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@Tag(name = "Food Management", description = "APIs for managing food")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private SecurityUtil securityUtil;

    @Operation(summary = "Get all foods for the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the foods")
    })
    @GetMapping("/user")
    public ResponseEntity<List<FoodResponse>> getFoodsByUser() {
        Long userId = securityUtil.getUserIdFromToken();
        List<FoodResponse> foods = foodService.getFoodsByUserId(userId);
        return ResponseEntity.ok(foods);
    }

    @Operation(summary = "Get a food by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the food"),
            @ApiResponse(responseCode = "404", description = "Food not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<FoodResponse> getFoodById(@PathVariable Long id) {
        FoodResponse foodResponse = foodService.getFoodById(id);
        return ResponseEntity.ok(foodResponse);
    }

    @Operation(summary = "Deactivate a food by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Food deactivated successfully"),
            @ApiResponse(responseCode = "404", description = "Food not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivateFoodById(@PathVariable Long id) {
        foodService.deactivateFoodById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete a food by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Food deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Food not found")
    })
    @DeleteMapping("/{id}/hard-delete")
    public ResponseEntity<Void> deleteFoodById(@PathVariable Long id) {
        foodService.deleteFoodById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Create a new food")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Food created successfully")
    })
    @PostMapping
    public ResponseEntity<FoodResponse> createFood(@RequestBody FoodCreateRequest foodRequest) {
        Long userId = securityUtil.getUserIdFromToken();
        FoodResponse createdFood = foodService.createFood(userId, foodRequest);
        return ResponseEntity.ok(createdFood);
    }

    @Operation(summary = "Get simple food details for the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the foods")
    })
    @GetMapping("/user/simple")
    public ResponseEntity<List<SimpleFoodResponse>> getSimpleFoodsByUser() {
        Long userId = securityUtil.getUserIdFromToken();
        List<SimpleFoodResponse> foods = foodService.getSimpleFoodsByUserId(userId);
        return ResponseEntity.ok(foods);
    }

    @Operation(summary = "Search foods by title for the current user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the foods")
    })
    @GetMapping("/user/simple/search")
    public ResponseEntity<List<SimpleFoodResponse>> searchFoodsByTitle(@RequestParam String title) {
        Long userId = securityUtil.getUserIdFromToken();
        List<SimpleFoodResponse> foods = foodService.searchFoodsByTitle(userId, title);
        return ResponseEntity.ok(foods);
    }

    @Operation(summary = "Update a food by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Food updated successfully"),
            @ApiResponse(responseCode = "404", description = "Food not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<FoodResponse> updateFood(@PathVariable Long id, @RequestBody FoodUpdateRequest foodRequest) {
        Long userId = securityUtil.getUserIdFromToken();
        FoodResponse updatedFood = foodService.updateFood(id, foodRequest, userId);
        return ResponseEntity.ok(updatedFood);
    }
}
