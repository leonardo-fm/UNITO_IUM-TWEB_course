package com.example.springboot.dto;

import com.example.springboot.entity.Game;

import java.time.LocalDate;

public class GameDto {
    private int countryId;
    private String countryName;
    private String competitionId;
    private String competitionName;
    private long homeClubId;
    private String homeClubName;
    private int homeClubScore;
    private long awayClubId;
    private String awayClubName;
    private int awayClubScore;
    private LocalDate date;

    public GameDto(Game game) {
        countryId = -1;
        countryName = "country name test";
        competitionId = game.getCompetitionId();
        competitionName = "competition name test";
        homeClubId = game.getHomeClubId();
        homeClubName = getHomeClubName();
        homeClubScore = getHomeClubScore();
        awayClubId = game.getAwayClubId();
        awayClubName = game.getAwayClubName();
        awayClubScore = getAwayClubScore();
        date = game.getDate();
    }

    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
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

    public long getHomeClubId() {
        return homeClubId;
    }

    public void setHomeClubId(long homeClubId) {
        this.homeClubId = homeClubId;
    }

    public String getHomeClubName() {
        return homeClubName;
    }

    public void setHomeClubName(String homeClubName) {
        this.homeClubName = homeClubName;
    }

    public int getHomeClubScore() {
        return homeClubScore;
    }

    public void setHomeClubScore(int homeClubScore) {
        this.homeClubScore = homeClubScore;
    }

    public long getAwayClubId() {
        return awayClubId;
    }

    public void setAwayClubId(long awayClubId) {
        this.awayClubId = awayClubId;
    }

    public String getAwayClubName() {
        return awayClubName;
    }

    public void setAwayClubName(String awayClubName) {
        this.awayClubName = awayClubName;
    }

    public int getAwayClubScore() {
        return awayClubScore;
    }

    public void setAwayClubScore(int awayClubScore) {
        this.awayClubScore = awayClubScore;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
