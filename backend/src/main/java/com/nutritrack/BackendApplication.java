package com.nutritrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.nutritrack")
@EnableJpaRepositories(basePackages = "com.nutritrack.respository") // someone startet the project with a typo, now we
																	// use respository instead of repository :)
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
