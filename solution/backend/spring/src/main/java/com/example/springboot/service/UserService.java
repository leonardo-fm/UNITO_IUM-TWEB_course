package com.example.springboot.service;

import com.example.springboot.dto.UserDto;
import com.example.springboot.entity.User;
import com.example.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto login(UserDto userDto) {
        User user = userRepository.getUser(userDto.getUsername());
        if (user == null) return null;
        String passwordHash = Integer.toString(userDto.getPassword().hashCode());
        if (!user.getPassword().equals(passwordHash)) return null;
        return new UserDto(userRepository.getUser(userDto.getUsername()));
    }

    public boolean register(UserDto userDto) {
        User user = userRepository.getUser(userDto.getUsername());
        if (user != null) return false;
        userRepository.addUser(userDto.getUsername(), Integer.toString(userDto.getPassword().hashCode()));
        return true;
    }
}
