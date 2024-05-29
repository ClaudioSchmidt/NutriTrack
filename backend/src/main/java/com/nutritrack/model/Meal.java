package com.nutritrack.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private Long mealId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "rating", nullable = false)
    private Long rating;

    @Column(name = "calories", nullable = false)
    private Long calories;

    @Column(name = "carbohydrates", nullable = false)
    private Double carbohydrates;

    @Column(name = "fat", nullable = false)
    private Double fat;

    @Column(name = "protein", nullable = false)
    private Double protein;

    @Column(name = "vegetarian", nullable = false)
    private Boolean vegetarian;

    @Column(name = "vegan", nullable = false)
    private Boolean vegan;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date date;
}
