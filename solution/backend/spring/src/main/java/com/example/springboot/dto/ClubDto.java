package com.example.springboot.dto;

import com.example.springboot.entity.Club;
import com.example.springboot.entity.Competition;

public final class ClubDto {
    private Long clubId;
    private String clubName;
    private Integer countryId;

    public ClubDto(Club club, Competition competition) {
        clubId = club.getId();
        clubName = club.getName();
        countryId = competition.getCountryId();
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
