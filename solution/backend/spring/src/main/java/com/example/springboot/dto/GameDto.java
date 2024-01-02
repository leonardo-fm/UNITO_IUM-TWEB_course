package com.example.springboot.dto;

import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public final class GameDto {
    private Long gameId;
    private Integer countryId;
    private String competitionId;
    private String competitionName;
    private Long homeClubId;
    private String homeClubName;
    private Integer homeClubScore;
    private Long awayClubId;
    private String awayClubName;
    private Integer awayClubScore;
    @Schema(description = "Date of the game")
    private LocalDate date;

    public GameDto(Game game, Competition competition) {
        gameId = game.getId();
        countryId = competition.getCountryId();
        competitionId = game.getCompetitionId();
        competitionName = competition.getName();
        homeClubId = game.getHomeClubId();
        homeClubName = game.getHomeClubName();
        homeClubScore = game.getHomeClubGoals();
        awayClubId = game.getAwayClubId();
        awayClubName = game.getAwayClubName();
        awayClubScore = game.getAwayClubGoals();
        date = game.getDate();
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getCompetitionName() {
        return competitionName;
    }

    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    public Long getHomeClubId() {
        return homeClubId;
    }

    public void setHomeClubId(Long homeClubId) {
        this.homeClubId = homeClubId;
    }

    public String getHomeClubName() {
        return homeClubName;
    }

    public void setHomeClubName(String homeClubName) {
        this.homeClubName = homeClubName;
    }

    public Integer getHomeClubScore() {
        return homeClubScore;
    }

    public void setHomeClubScore(Integer homeClubScore) {
        this.homeClubScore = homeClubScore;
    }

    public Long getAwayClubId() {
        return awayClubId;
    }

    public void setAwayClubId(Long awayClubId) {
        this.awayClubId = awayClubId;
    }

    public String getAwayClubName() {
        return awayClubName;
    }

    public void setAwayClubName(String awayClubName) {
        this.awayClubName = awayClubName;
    }

    public Integer getAwayClubScore() {
        return awayClubScore;
    }

    public void setAwayClubScore(Integer awayClubScore) {
        this.awayClubScore = awayClubScore;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
