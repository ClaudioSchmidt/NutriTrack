package com.nutritrack.repository;

import com.nutritrack.model.Sustainability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SustainabilityRepository extends JpaRepository<Sustainability, Long> {
}
