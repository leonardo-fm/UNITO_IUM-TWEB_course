package com.example.springboot.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/utils")
public class UtilsController {

    @GetMapping("/healthCheck")
    @Operation(summary = "Return a health check")
    public Date HealthCheck() {
        return new Date();
    }
}
