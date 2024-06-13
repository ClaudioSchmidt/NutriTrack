package com.nutritrack.repository;

import com.nutritrack.model.Portion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.lang.NonNull;

@Repository
public interface PortionRepository extends JpaRepository<Portion, Long> {
    void deleteById(@NonNull Long id);
}
