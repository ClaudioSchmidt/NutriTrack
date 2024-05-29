package com.nutritrack.service;

import org.springframework.stereotype.Service;

import com.nutritrack.model.Meal;
import com.nutritrack.repository.MealRepository;

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

    public Meal saveMeal(Meal meal) {
        return mealRepository.save(meal);
    }
}