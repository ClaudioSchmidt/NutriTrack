package com.nutritrack.repository;

import com.nutritrack.model.Tracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrackingRepository extends JpaRepository<Tracking, Long> {
    List<Tracking> findByUserId(Long userId);

    List<Tracking> findByFoodId(Long foodId);

    List<Tracking> findByPortionId(Long portionId);

    List<Tracking> findByUserIdAndTimestampBetween(Long userId, LocalDateTime start, LocalDateTime end);
}
