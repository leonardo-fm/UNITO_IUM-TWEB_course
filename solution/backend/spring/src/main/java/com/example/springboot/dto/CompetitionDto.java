package com.example.springboot.dto;

import com.example.springboot.entity.Competition;

public final class CompetitionDto {
    private String competitionId;
    private Integer countryId;
    private String name;
    private Integer[] seasons;

    public CompetitionDto(Competition competition, Integer[] seasons) {
        competitionId = competition.getId();
        countryId = competition.getCountryId();
        name = competition.getName();
        this.seasons = seasons;
    }

    public String getCompetition_id() {
        return competitionId;
    }

    public void setCompetition_id(String competition_id) {
        this.competitionId = competition_id;
    }

    public Integer getCountry_id() {
        return countryId;
    }

    public void setCountry_id(Integer country_id) {
        this.countryId = country_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer[] getSeasons() {
        return seasons;
    }

    public void setSeasons(Integer[] seasons) {
        this.seasons = seasons;
    }
}
