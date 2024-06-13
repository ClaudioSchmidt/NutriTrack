package com.nutritrack.dto;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class RegisterRequest {

    @NotBlank
    @Size(max = 50)
    @Schema(description = "Username of the user, must be unique")
    private String username;

    @NotBlank
    @Email
    @Size(max = 100)
    @Schema(description = "Email of the user, used for login and notifications")
    private String email;

    @NotBlank
    @Size(min = 6, max = 255)
    @Schema(description = "Password of the user, must be at least 8 characters long")
    private String password;

    @NotBlank
    @Size(max = 50)
    @Schema(description = "First name of the user")
    private String firstName;

    @NotBlank
    @Size(max = 50)
    @Schema(description = "Last name of the user")
    private String lastName;
}
