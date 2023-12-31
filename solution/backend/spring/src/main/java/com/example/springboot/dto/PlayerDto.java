package com.example.springboot.dto;

import com.example.springboot.entity.Player;

public final class PlayerDto {
    private Long id;
    private String fullName;
    private String position;
    private String subPosition;
    private String imageUrl;

    public PlayerDto(Player player) {
        id = player.getId();
        fullName = player.getName();
        position = player.getPosition();
        subPosition = player.getSubPosition();
        imageUrl = player.getImageUrl();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getSubPosition() {
        return subPosition;
    }

    public void setSubPosition(String subPosition) {
        this.subPosition = subPosition;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
