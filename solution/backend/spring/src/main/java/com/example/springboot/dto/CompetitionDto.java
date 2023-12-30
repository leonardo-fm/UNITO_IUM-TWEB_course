package com.example.springboot.dto;

import com.example.springboot.entity.Competition;

public final class CompetitionDto {
    private String competitionId;
    private int countryId;
    private String name;
    private int[] seasons;

    public CompetitionDto(Competition competition, int[] seasons) {
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

    public int getCountry_id() {
        return countryId;
    }

    public void setCountry_id(int country_id) {
        this.countryId = country_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int[] getSeasons() {
        return seasons;
    }

    public void setSeasons(int[] seasons) {
        this.seasons = seasons;
    }
}
