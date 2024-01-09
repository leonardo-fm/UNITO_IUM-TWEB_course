package com.example.springboot.dto;

import com.example.springboot.entity.User;

public final class UserDto {

    private Integer id;
    private String username;
    private String password;

    public UserDto() {
    }

    public UserDto(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public UserDto(User user) {
        id = user.getId();
        username = user.getUsername();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
