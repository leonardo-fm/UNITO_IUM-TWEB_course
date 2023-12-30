package com.example.springboot.dto;

import com.example.springboot.entity.Club;

public final class ClubDto {
    private Long clubId;
    private String clubName;
    private Integer countryId;

    // TODO to finish
    public ClubDto(Club club) {
        clubId = club.getId();
        clubName = club.getName();
        countryId = -1;
    }

    public Long getClubId() {
        return clubId;
    }

    public void setClubId(Long clubId) {
        this.clubId = clubId;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }
}
