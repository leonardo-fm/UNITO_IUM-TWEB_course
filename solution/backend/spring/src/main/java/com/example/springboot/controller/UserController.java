package com.example.springboot.controller;

import com.example.springboot.dto.UserDto;
import com.example.springboot.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Return a boolean indicate if the login has been successful")
    public ResponseEntity<UserDto> Login(@RequestBody UserDto userDto) {
        try {
            return new ResponseEntity(userService.login(userDto), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Register a new user and return a boolean")
    public ResponseEntity<Boolean> Register(@RequestBody UserDto userDto) {
        try {
            return new ResponseEntity(userService.register(userDto), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
