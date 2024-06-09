package com.nutritrack.service;

import com.nutritrack.dto.FoodCreateRequest;
import com.nutritrack.dto.FoodResponse;
import com.nutritrack.dto.FoodUpdateRequest;
import com.nutritrack.dto.SimpleFoodResponse;
import com.nutritrack.exception.ResourceNotFoundException;
import com.nutritrack.model.*;
import com.nutritrack.repository.FoodRepository;
import com.nutritrack.repository.PortionRepository;
import com.nutritrack.repository.TrackingRepository;
import com.nutritrack.repository.UserRepository;
import com.nutritrack.mapper.FoodMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {

        @Autowired
        private FoodRepository foodRepository;

        @Autowired
        private PortionRepository portionRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private FoodMapper foodMapper;

        @Autowired
        private TrackingRepository trackingRepository;

        public List<FoodResponse> getFoodsByUserId(Long userId) {
                return foodRepository.findByUserId(userId).stream()
                                .map(foodMapper::toResponse)
                                .collect(Collectors.toList());
        }

        @Transactional
        public FoodResponse createFood(Long userId, FoodCreateRequest foodCreateRequest) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Food food = foodMapper.toEntity(foodCreateRequest, user);
                Food savedFood = foodRepository.save(food);
                return foodMapper.toResponse(savedFood);
        }

        @Transactional
        public void deactivateFoodById(Long foodId) {
                Food food = foodRepository.findById(foodId)
                                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));
                food.setDeactivated(true); // Set deactivated flag instead of deleting
                foodRepository.save(food);
        }

        @Transactional
        public void deleteFoodById(Long foodId) {
                Food food = foodRepository.findById(foodId)
                                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));

                List<Tracking> trackings = trackingRepository.findByFoodId(foodId);
                for (Tracking tracking : trackings) {
                        tracking.setFood(null);
                        tracking.setPortion(null);
                }
                trackingRepository.saveAll(trackings);

                foodRepository.delete(food);
        }

        public FoodResponse getFoodById(Long foodId) {
                Food food = foodRepository.findById(foodId)
                                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));
                return foodMapper.toResponse(food);
        }

        public List<SimpleFoodResponse> getSimpleFoodsByUserId(Long userId) {
                List<Food> foods = foodRepository.findByUserIdAndDeactivatedFalse(userId);
                return foods.stream()
                                .map(food -> new SimpleFoodResponse(food.getId(), food.getTitle(), food.getBrand(),
                                                food.getCategory()))
                                .collect(Collectors.toList());
        }

        public List<SimpleFoodResponse> searchFoodsByTitle(Long userId, String title) {
                List<Food> foods = foodRepository.findByUserIdAndTitleContainingAndDeactivatedFalse(userId, title);
                return foods.stream()
                                .map(food -> new SimpleFoodResponse(food.getId(), food.getTitle(), food.getBrand(),
                                                food.getCategory()))
                                .collect(Collectors.toList());
        }

        @Transactional
        public FoodResponse updateFood(Long foodId, FoodUpdateRequest foodUpdateRequest, Long userId) {
                Food existingFood = foodRepository.findById(foodId)
                                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + foodId));

                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

                // Update the basic fields and nutrition, sustainability information
                Food updatedFood = foodMapper.toEntity(foodUpdateRequest, user, existingFood);

                // Remove portions not in the request
                List<Long> portionIdsInRequest = foodUpdateRequest.getPortions().stream()
                                .filter(portionRequest -> portionRequest.getId() != null)
                                .map(FoodUpdateRequest.PortionUpdateRequest::getId)
                                .collect(Collectors.toList());

                List<Portion> portionsToRemove = existingFood.getPortions().stream()
                                .filter(portion -> portion.getId() != null
                                                && !portionIdsInRequest.contains(portion.getId()))
                                .collect(Collectors.toList());

                // Update tracking entries before deleting portions
                for (Portion portion : portionsToRemove) {
                        List<Tracking> trackings = trackingRepository.findByPortionId(portion.getId());
                        for (Tracking tracking : trackings) {
                                tracking.setPortion(null);
                                tracking.setQuantity(tracking.getQuantity() * portion.getQuantity());
                        }
                        trackingRepository.saveAll(trackings);
                }

                existingFood.getPortions().removeAll(portionsToRemove);
                portionsToRemove.forEach(portionRepository::delete);

                Food savedFood = foodRepository.save(updatedFood);
                return foodMapper.toResponse(savedFood);
        }
}
