package com.example.springboot;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "Soccer API",
                version = "1.0.0",
                description = "API for soccer site for project IUM-TWEB"
        )
)
public class SoccerAPIApplication {

    public static void main(String[] args) {
        SpringApplication.run(SoccerAPIApplication.class, args);
    }
}
