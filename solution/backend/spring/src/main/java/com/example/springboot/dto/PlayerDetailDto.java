package com.example.springboot.dto;

import com.example.springboot.entity.Player;

import java.time.LocalDate;

public final class PlayerDetailDto {
    private Long id;
    private String fullName;
    private Long clubId;
    private String countryName;
    private LocalDate dateOfBirth;
    private String position;
    private String subPosition;
    private String foot;
    private Integer height;
    private Long marketValue;
    private String imageUrl;

    public PlayerDetailDto(Player player) {
        id = player.getId();
        fullName = player.getName();
        clubId = player.getClubId();
        countryName = player.getCountryOfCitizenship();
        dateOfBirth = player.getDateOfBirth();
        position = player.getPosition();
        subPosition = player.getSubPosition();
        foot = player.getFoot();
        height = player.getHeightInCm();
        marketValue = player.getMarketValueInEur();
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

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Long getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(Long marketValue) {
        this.marketValue = marketValue;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}