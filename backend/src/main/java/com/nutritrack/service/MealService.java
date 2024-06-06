package com.nutritrack.service;

import org.springframework.stereotype.Service;

import com.nutritrack.exception.ResourceNotFoundException;
import com.nutritrack.model.Meal;
import com.nutritrack.repository.MealRepository;

import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {
    private final MealRepository mealRepository;

    public MealService(MealRepository repository) {
        this.mealRepository = repository;
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Meal getMealById(Long id) {
        return mealRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with id " + id));
    }

    public List<Meal> getMealsByUserId(Long userId) {
        return mealRepository.findByUserId(userId);
    }

    public Meal saveMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public Meal updateMeal(Long id, Meal meal) {
        return mealRepository.findById(id)
                .map(existingMeal -> {
                    existingMeal.setTitle(meal.getTitle());
                    existingMeal.setRating(meal.getRating());
                    existingMeal.setCalories(meal.getCalories());
                    existingMeal.setCarbohydrates(meal.getCarbohydrates());
                    existingMeal.setFat(meal.getFat());
                    existingMeal.setProtein(meal.getProtein());
                    existingMeal.setVegetarian(meal.getVegetarian());
                    existingMeal.setVegan(meal.getVegan());
                    existingMeal.setDate(meal.getDate());
                    return mealRepository.save(existingMeal);
                })
                .orElseThrow(() -> new ResourceNotFoundException("Meal not found with id " + id));
    }

    public void deleteMeal(Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Meal not found with id " + id);
        }
    }

    public List<Meal> searchMeals(String keyword) {
        return mealRepository.findAll((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null) {
                predicates.add(cb.like(root.get("title"), "%" + keyword + "%"));
            }

            return cb.or(predicates.toArray(new Predicate[0]));
        });
    }
}