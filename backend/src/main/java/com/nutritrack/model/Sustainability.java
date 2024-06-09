package com.nutritrack.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "sustainability")
public class Sustainability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float co2perKg; // Wenn du es als float behalten möchtest

    @Enumerated(EnumType.STRING)
    private DietType dietType;

    @OneToOne(mappedBy = "sustainability", fetch = FetchType.LAZY)
    @JsonBackReference
    private Food food;
}
