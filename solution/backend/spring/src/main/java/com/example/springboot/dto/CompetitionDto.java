package com.example.springboot.dto;

import com.example.springboot.entity.Competition;

import java.util.List;

public final class CompetitionDto {
    private String competitionId;
    private Integer countryId;
    private String name;
    private List<Integer> seasons;

    public CompetitionDto(Competition competition, List<Integer> seasons) {
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

    public List<Integer> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Integer> seasons) {
        this.seasons = seasons;
    }
}
