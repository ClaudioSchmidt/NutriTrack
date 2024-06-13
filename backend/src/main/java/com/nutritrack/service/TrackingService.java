package com.nutritrack.service;

import com.nutritrack.dto.DailyTrackingSummary;
import com.nutritrack.dto.TrackingCreateRequest;
import com.nutritrack.dto.TrackingResponse;
import com.nutritrack.dto.TrackingUpdateRequest;
import com.nutritrack.mapper.TrackingMapper;
import com.nutritrack.model.Food;
import com.nutritrack.model.Portion;
import com.nutritrack.model.Tracking;
import com.nutritrack.model.User;
import com.nutritrack.repository.FoodRepository;
import com.nutritrack.repository.PortionRepository;
import com.nutritrack.repository.TrackingRepository;
import com.nutritrack.repository.UserRepository;
import com.nutritrack.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrackingService {

        @Autowired
        private TrackingRepository trackingRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private FoodRepository foodRepository;

        @Autowired
        private PortionRepository portionRepository;

        @Autowired
        private TrackingMapper trackingMapper;

        @Autowired
        private UserStatsService dailyUserStatsService;

        @Transactional
        public TrackingResponse createTracking(Long userId, TrackingCreateRequest request) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found",
                                                "User not found with id: " + userId));
                Food food = foodRepository.findById(request.getFoodId())
                                .orElseThrow(() -> new ResourceNotFoundException("Food not found",
                                                "Food not found with id: " + request.getFoodId()));

                Portion portion = Optional.ofNullable(request.getPortionId())
                                .map(portionId -> portionRepository.findById(portionId)
                                                .orElseThrow(() -> new ResourceNotFoundException("Portion not found",
                                                                "Portion not found with id: " + portionId)))
                                .orElse(null);

                Tracking tracking = new Tracking();
                tracking.setUser(user);
                tracking.setFood(food);
                tracking.setPortion(portion);
                tracking.setQuantity(request.getQuantity());
                tracking.setTimestamp(LocalDateTime.now());

                Tracking savedTracking = trackingRepository.save(tracking);
                dailyUserStatsService.saveDailyStats(userId, LocalDate.now());
                return trackingMapper.toResponse(savedTracking);
        }

        @Transactional(readOnly = true)
        public List<Tracking> getTrackingsByUserId(Long userId) {
                return trackingRepository.findByUserId(userId);
        }

        @Transactional
        public void deleteTracking(Long trackingId) {
                Tracking tracking = trackingRepository.findById(trackingId)
                                .orElseThrow(() -> new ResourceNotFoundException("Tracking entry not found",
                                                "Tracking entry not found with id: " + trackingId));
                trackingRepository.delete(tracking);
                dailyUserStatsService.saveDailyStats(tracking.getUser().getId(), tracking.getTimestamp().toLocalDate());
        }

        @Transactional
        public TrackingResponse updateTracking(Long trackingId, TrackingUpdateRequest request) {
                Tracking tracking = trackingRepository.findById(trackingId)
                                .orElseThrow(() -> new ResourceNotFoundException("Tracking entry not found",
                                                "Tracking entry not found with id: " + trackingId));

                Portion portion = Optional.ofNullable(request.getPortionId())
                                .map(portionId -> portionRepository.findById(portionId)
                                                .orElseThrow(() -> new ResourceNotFoundException("Portion not found",
                                                                "Portion not found with id: " + portionId)))
                                .orElse(null);

                tracking.setPortion(portion);
                tracking.setQuantity(request.getQuantity());

                Tracking updatedTracking = trackingRepository.save(tracking);
                dailyUserStatsService.saveDailyStats(tracking.getUser().getId(), tracking.getTimestamp().toLocalDate());
                return trackingMapper.toResponse(updatedTracking);
        }

        @Transactional(readOnly = true)
        public DailyTrackingSummary getTrackingsByUserAndDate(Long userId, LocalDate date) {
                LocalDateTime startOfDay = date.atStartOfDay();
                LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

                List<Tracking> trackings = trackingRepository.findByUserIdAndTimestampBetween(userId, startOfDay,
                                endOfDay);
                List<TrackingResponse> trackingResponses = trackings.stream()
                                .map(trackingMapper::toResponse)
                                .collect(Collectors.toList());

                DailyTrackingSummary summary = new DailyTrackingSummary();
                summary.setTrackings(trackingResponses);

                // Fetch the summary from the stats table
                DailyTrackingSummary.DailySummary dailySummary = dailyUserStatsService.getDailySummary(userId, date);
                summary.setSummary(dailySummary);

                return summary;
        }
}
