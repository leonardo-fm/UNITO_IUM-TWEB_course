package com.example.springboot.dto;

import java.time.LocalDate;

public class GameDto {
    private int id;
    private String competitionId;
    private int season;
    private String round;
    private LocalDate date;
    private int homeClubId;
    private int awayClubId;
    private int homeClubGoals;
    private int awayClubGoals;
    private int homeClubPosition;
    private int awayClubPosition;
    private String homeClubManagerName;
    private String awayClubManagerName;
    private String stadium;
    private int attendance;
    private String referee;
    private String url;
    private String homeClubFormation;
    private String awayClubFormation;
    private String homeClubName;
    private String awayClubName;
    // aggregate: final result 1:0 or 2:1
    private String aggregate;
    private String competitionType;
}
