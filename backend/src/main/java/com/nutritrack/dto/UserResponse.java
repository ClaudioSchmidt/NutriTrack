package com.nutritrack.dto;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
public class UserResponse {

    @Schema(description = "Unique identifier of the user")
    private Long id;

    @Schema(description = "Username of the user")
    private String username;

    @Schema(description = "Email of the user")
    private String email;

    @Schema(description = "First name of the user")
    private String firstName;

    @Schema(description = "Last name of the user")
    private String lastName;
}
