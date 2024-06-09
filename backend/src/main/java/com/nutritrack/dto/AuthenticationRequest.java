package com.nutritrack.dto;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Data
public class AuthenticationRequest {

    @NotBlank
    @Schema(description = "Username of the user")
    private String username;

    @NotBlank
    @Schema(description = "Password of the user")
    private String password;
}
