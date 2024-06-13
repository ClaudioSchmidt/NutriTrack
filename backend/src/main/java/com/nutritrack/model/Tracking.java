package com.nutritrack.model;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tracking")
@Schema(description = "Represents a tracking entry for food consumption")
public class Tracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the tracking entry")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(description = "User who tracked the food")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "food_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @Schema(description = "Food that was tracked")
    private Food food;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "portion_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    @Schema(description = "Portion size that was tracked")
    private Portion portion;

    @Column(nullable = false)
    @Schema(description = "Quantity of the food tracked")
    private float quantity;

    @Column(nullable = false)
    @Schema(description = "Date and time when the food was tracked")
    private LocalDateTime timestamp;
}
