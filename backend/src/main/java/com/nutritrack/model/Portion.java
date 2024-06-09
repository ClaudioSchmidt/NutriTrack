package com.nutritrack.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "portion")
public class Portion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String label;
    private float quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id")
    @JsonBackReference
    private Food food;
}
