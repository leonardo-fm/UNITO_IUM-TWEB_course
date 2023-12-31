package com.example.springboot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "game")
public class Game {

    @Id
    @Column(name = "game_id")
    private Long id;

    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "season")
    private Integer season;

    @Column(name = "round")
    private String round;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "home_club_id")
    private Long homeClubId;

    @Column(name = "away_club_id")
    private Long awayClubId;

    @Column(name = "home_club_goals")
    private Integer homeClubGoals;

    @Column(name = "away_club_goals")
    private Integer awayClubGoals;

    @Column(name = "home_club_position")
    private Integer homeClubPosition;

    @Column(name = "away_club_position")
    private Integer awayClubPosition;

    @Column(name = "home_club_manager_name")
    private String homeClubManagerName;

    @Column(name = "away_club_manager_name")
    private String awayClubManagerName;

    @Column(name = "stadium")
    private String stadium;

    @Column(name = "attendance")
    private Long attendance;

    @Column(name = "referee")
    private String referee;

    @Column(name = "url")
    private String url;

    @Column(name = "home_club_formation")
    private String homeClubFormation;

    @Column(name = "away_club_formation")
    private String awayClubFormation;

    @Column(name = "home_club_name")
    private String homeClubName;

    @Column(name = "away_club_name")
    private String awayClubName;

    @Column(name = "aggregate")
    private String aggregate;

    @Column(name = "competition_type")
    private String competitionType;

    public Game() { }

    public Game(Long id, String competitionId, Integer season, String round, LocalDate date, Long homeClubId, Long awayClubId, Integer homeClubGoals, Integer awayClubGoals, Integer homeClubPosition, Integer awayClubPosition, String homeClubManagerName, String awayClubManagerName, String stadium, Long attendance, String referee, String url, String homeClubFormation, String awayClubFormation, String homeClubName, String awayClubName, String aggregate, String competitionType) {
        this.id = id;
        this.competitionId = competitionId;
        this.season = season;
        this.round = round;
        this.date = date;
        this.homeClubId = homeClubId;
        this.awayClubId = awayClubId;
        this.homeClubGoals = homeClubGoals;
        this.awayClubGoals = awayClubGoals;
        this.homeClubPosition = homeClubPosition;
        this.awayClubPosition = awayClubPosition;
        this.homeClubManagerName = homeClubManagerName;
        this.awayClubManagerName = awayClubManagerName;
        this.stadium = stadium;
        this.attendance = attendance;
        this.referee = referee;
        this.url = url;
        this.homeClubFormation = homeClubFormation;
        this.awayClubFormation = awayClubFormation;
        this.homeClubName = homeClubName;
        this.awayClubName = awayClubName;
        this.aggregate = aggregate;
        this.competitionType = competitionType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public String getRound() {
        return round;
    }

    public void setRound(String round) {
        this.round = round;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getHomeClubId() {
        return homeClubId;
    }

    public void setHomeClubId(Long homeClubId) {
        this.homeClubId = homeClubId;
    }

    public Long getAwayClubId() {
        return awayClubId;
    }

    public void setAwayClubId(Long awayClubId) {
        this.awayClubId = awayClubId;
    }

    public Integer getHomeClubGoals() {
        return homeClubGoals;
    }

    public void setHomeClubGoals(Integer homeClubGoals) {
        this.homeClubGoals = homeClubGoals;
    }

    public Integer getAwayClubGoals() {
        return awayClubGoals;
    }

    public void setAwayClubGoals(Integer awayClubGoals) {
        this.awayClubGoals = awayClubGoals;
    }

    public Integer getHomeClubPosition() {
        return homeClubPosition;
    }

    public void setHomeClubPosition(Integer homeClubPosition) {
        this.homeClubPosition = homeClubPosition;
    }

    public Integer getAwayClubPosition() {
        return awayClubPosition;
    }

    public void setAwayClubPosition(Integer awayClubPosition) {
        this.awayClubPosition = awayClubPosition;
    }

    public String getHomeClubManagerName() {
        return homeClubManagerName;
    }

    public void setHomeClubManagerName(String homeClubManagerName) {
        this.homeClubManagerName = homeClubManagerName;
    }

    public String getAwayClubManagerName() {
        return awayClubManagerName;
    }

    public void setAwayClubManagerName(String awayClubManagerName) {
        this.awayClubManagerName = awayClubManagerName;
    }

    public String getStadium() {
        return stadium;
    }

    public void setStadium(String stadium) {
        this.stadium = stadium;
    }

    public Long getAttendance() {
        return attendance;
    }

    public void setAttendance(Long attendance) {
        this.attendance = attendance;
    }

    public String getReferee() {
        return referee;
    }

    public void setReferee(String referee) {
        this.referee = referee;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getHomeClubFormation() {
        return homeClubFormation;
    }

    public void setHomeClubFormation(String homeClubFormation) {
        this.homeClubFormation = homeClubFormation;
    }

    public String getAwayClubFormation() {
        return awayClubFormation;
    }

    public void setAwayClubFormation(String awayClubFormation) {
        this.awayClubFormation = awayClubFormation;
    }

    public String getHomeClubName() {
        return homeClubName;
    }

    public void setHomeClubName(String homeClubName) {
        this.homeClubName = homeClubName;
    }

    public String getAwayClubName() {
        return awayClubName;
    }

    public void setAwayClubName(String awayClubName) {
        this.awayClubName = awayClubName;
    }

    public String getAggregate() {
        return aggregate;
    }

    public void setAggregate(String aggregate) {
        this.aggregate = aggregate;
    }

    public String getCompetitionType() {
        return competitionType;
    }

    public void setCompetitionType(String competitionType) {
        this.competitionType = competitionType;
    }
}
