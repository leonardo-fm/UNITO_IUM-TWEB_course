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

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competition_id) {
        this.competitionId = competition_id;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer country_id) {
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
