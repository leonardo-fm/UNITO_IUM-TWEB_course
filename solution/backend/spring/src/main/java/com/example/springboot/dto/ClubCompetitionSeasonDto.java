package com.example.springboot.dto;

import com.example.springboot.entity.Club;

public final class ClubCompetitionSeasonDto {
    private Long clubId;
    private String clubName;
    private Integer wins;
    private Integer draws;
    private Integer loses;
    private Integer scoreGoals;
    private Integer takenGoals;

    public ClubCompetitionSeasonDto(Club club, int wins, int draws, int loses, int scoreGoals, int takenGoals) {
        clubId = club.getId();
        clubName = club.getName();
        this.wins = wins;
        this.draws = draws;
        this.loses = loses;
        this.scoreGoals = scoreGoals;
        this.takenGoals = takenGoals;
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

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getLoses() {
        return loses;
    }

    public void setLoses(Integer loses) {
        this.loses = loses;
    }

    public Integer getScoreGoals() {
        return scoreGoals;
    }

    public void setScoreGoals(Integer scoreGoals) {
        this.scoreGoals = scoreGoals;
    }

    public Integer getTakenGoals() {
        return takenGoals;
    }

    public void setTakenGoals(Integer takenGoals) {
        this.takenGoals = takenGoals;
    }
}
