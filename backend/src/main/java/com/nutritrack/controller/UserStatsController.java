package com.nutritrack.controller;

import com.nutritrack.dto.DailyTrackingSummary;
import com.nutritrack.dto.TotalTrackingSummary;
import com.nutritrack.service.UserStatsService;
import com.nutritrack.util.SecurityUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Stats Management", description = "APIs for managing stats")
public class UserStatsController {

    @Autowired
    private UserStatsService userStatsService;

    @Autowired
    private SecurityUtil securityUtil;

    @Operation(summary = "Get daily summary for the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Daily summary retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Stats not found")
    })
    @GetMapping("/user/date")
    public ResponseEntity<DailyTrackingSummary.DailySummary> getDailySummary(@RequestParam LocalDate date) {
        Long userId = securityUtil.getUserIdFromToken();
        DailyTrackingSummary.DailySummary dailySummary = userStatsService.getDailySummary(userId, date);
        return ResponseEntity.ok(dailySummary);
    }

    @Operation(summary = "Get total summary for the user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Total summary retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Stats not found")
    })
    @GetMapping("/user/total")
    public ResponseEntity<TotalTrackingSummary> getTotalSummary() {
        Long userId = securityUtil.getUserIdFromToken();
        TotalTrackingSummary totalSummary = userStatsService.getTotalTrackingSummary(userId);
        return ResponseEntity.ok(totalSummary);
    }
}
