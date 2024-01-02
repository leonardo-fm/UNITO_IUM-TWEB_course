package com.example.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/utils")
public class UtilsController {

    @GetMapping("/healthCheck")
    public Date HealthCheck() {
        return new Date();
    }
}
