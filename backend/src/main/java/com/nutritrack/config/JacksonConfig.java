package com.nutritrack.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        Hibernate6Module hibernate6Module = new Hibernate6Module();
        // Optional: Configure the module
        hibernate6Module.configure(Hibernate6Module.Feature.FORCE_LAZY_LOADING, false);
        mapper.registerModule(hibernate6Module);

        // Register JavaTimeModule to handle Java 8 date/time types
        mapper.registerModule(new JavaTimeModule());

        return mapper;
    }
}
