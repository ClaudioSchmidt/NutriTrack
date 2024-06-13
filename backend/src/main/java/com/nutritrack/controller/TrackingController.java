package com.nutritrack.controller;

import com.nutritrack.dto.DailyTrackingSummary;
import com.nutritrack.dto.TrackingCreateRequest;
import com.nutritrack.dto.TrackingResponse;
import com.nutritrack.dto.TrackingUpdateRequest;
import com.nutritrack.service.TrackingService;
import com.nutritrack.mapper.TrackingMapper;
import com.nutritrack.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tracking")
@Tag(name = "Track Management", description = "APIs for tracking food")
public class TrackingController {

        @Autowired
        private TrackingService trackingService;

        @Autowired
        private TrackingMapper trackingMapper;

        @Autowired
        private SecurityUtil securityUtil;

        @Operation(summary = "Get all tracking entries for the user")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "List of tracking entries retrieved successfully")
        })
        @GetMapping("/user")
        public ResponseEntity<List<TrackingResponse>> getTrackingsByUser() {
                Long userId = securityUtil.getUserIdFromToken();
                List<TrackingResponse> trackings = trackingService.getTrackingsByUserId(userId).stream()
                                .map(trackingMapper::toResponse)
                                .collect(Collectors.toList());
                return ResponseEntity.ok(trackings);
        }

        @Operation(summary = "Create a new tracking entry")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Tracking entry created successfully"),
                        @ApiResponse(responseCode = "404", description = "Food or Portion not found"),
                        @ApiResponse(responseCode = "400", description = "Invalid input")
        })
        @PostMapping
        public ResponseEntity<TrackingResponse> createTracking(@RequestBody TrackingCreateRequest request) {
                Long userId = securityUtil.getUserIdFromToken();
                TrackingResponse response = trackingService.createTracking(userId, request);
                return ResponseEntity.ok(response);
        }

        @Operation(summary = "Delete a tracking entry")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Tracking entry deleted successfully"),
                        @ApiResponse(responseCode = "404", description = "Tracking entry not found")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteTracking(@PathVariable Long id) {
                trackingService.deleteTracking(id);
                return ResponseEntity.noContent().build();
        }

        @Operation(summary = "Update a tracking entry")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Tracking entry updated successfully"),
                        @ApiResponse(responseCode = "404", description = "Tracking entry or Portion not found"),
                        @ApiResponse(responseCode = "400", description = "Invalid input")
        })
        @PutMapping("/{id}")
        public ResponseEntity<TrackingResponse> updateTracking(@PathVariable Long id,
                        @RequestBody TrackingUpdateRequest request) {
                TrackingResponse updatedTracking = trackingService.updateTracking(id, request);
                return ResponseEntity.ok(updatedTracking);
        }

        @Operation(summary = "Get all tracking entries and summary for the user on a specific date")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "List of tracking entries and summary retrieved successfully"),
                        @ApiResponse(responseCode = "400", description = "Invalid date format")
        })
        @GetMapping("/user/date")
        public ResponseEntity<DailyTrackingSummary> getTrackingsByUserAndDate(
                        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
                Long userId = securityUtil.getUserIdFromToken();
                DailyTrackingSummary summary = trackingService.getTrackingsByUserAndDate(userId, date);
                return ResponseEntity.ok(summary);
        }
}
