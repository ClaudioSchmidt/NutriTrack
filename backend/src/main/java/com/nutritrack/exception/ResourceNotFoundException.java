package com.nutritrack.exception;

import java.time.LocalDateTime;

public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private final LocalDateTime timestamp;
    private final String resource;

    public ResourceNotFoundException(String resource, String message) {
        super(message);
        this.timestamp = LocalDateTime.now();
        this.resource = resource;
    }

    public ResourceNotFoundException(String message) {
        super(message);
        this.timestamp = LocalDateTime.now();
        this.resource = null;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getResource() {
        return resource;
    }
}
