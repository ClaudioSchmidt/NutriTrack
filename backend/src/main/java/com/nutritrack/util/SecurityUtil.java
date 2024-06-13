package com.nutritrack.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

    public Long getUserIdFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            JwtAuthenticationToken jwtAuthentication = (JwtAuthenticationToken) authentication;
            String userIdString = (String) jwtAuthentication.getToken().getClaims().get("sub");
            return Long.valueOf(userIdString);
        } else {
            // Rückgabe einer festen User-ID für die Entwicklungsumgebung
            return 1L; // Beispielhafte User-ID, anpassen nach Bedarf
        }
    }
}
