package com.example.springboot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "club")
public class Club {

    @Id
    @Column(name = "club_id")
    private Long id;

    @Column(name = "club_code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private String domesticCompetitionId;

    @Column(name = "total_market_value")
    private Integer totalMarketValue;

    @Column(name = "squad_size")
    private Integer squadSize;

    @Column(name = "average_age")
    private Double averageAge;

    @Column(name = "foreigners_number")
    private Integer foreignersNumber;

    @Column(name = "foreigners_percentage")
    private Double foreignersPercentage;

    @Column(name = "national_team_players")
    private Integer nationalTeamPlayers;

    @Column(name = "stadium_name")
    private String stadiumName;

    @Column(name = "stadium_seats")
    private Integer stadiumSeats;

    @Column(name = "net_transfer_record")
    private String netTransferRecord;

    @Column(name = "coach_name")
    private String coachName;

    @Column(name = "last_season")
    private Integer lastSeason;

    @Column(name = "url")
    private String url;

    public Club() { }

    public Club(Long id, String code, String name, String domesticCompetitionId, Integer totalMarketValue, Integer squadSize, Double averageAge, Integer foreignersNumber, Double foreignersPercentage, Integer nationalTeamPlayers, String stadiumName, Integer stadiumSeats, String netTransferRecord, String coachName, Integer lastSeason, String url) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.domesticCompetitionId = domesticCompetitionId;
        this.totalMarketValue = totalMarketValue;
        this.squadSize = squadSize;
        this.averageAge = averageAge;
        this.foreignersNumber = foreignersNumber;
        this.foreignersPercentage = foreignersPercentage;
        this.nationalTeamPlayers = nationalTeamPlayers;
        this.stadiumName = stadiumName;
        this.stadiumSeats = stadiumSeats;
        this.netTransferRecord = netTransferRecord;
        this.coachName = coachName;
        this.lastSeason = lastSeason;
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomesticCompetitionId() {
        return domesticCompetitionId;
    }

    public void setDomesticCompetitionId(String domesticCompetitionId) {
        this.domesticCompetitionId = domesticCompetitionId;
    }

    public Integer getTotalMarketValue() {
        return totalMarketValue;
    }

    public void setTotalMarketValue(Integer totalMarketValue) {
        this.totalMarketValue = totalMarketValue;
    }

    public Integer getSquadSize() {
        return squadSize;
    }

    public void setSquadSize(Integer squadSize) {
        this.squadSize = squadSize;
    }

    public Double getAverageAge() {
        return averageAge;
    }

    public void setAverageAge(Double averageAge) {
        this.averageAge = averageAge;
    }

    public Integer getForeignersNumber() {
        return foreignersNumber;
    }

    public void setForeignersNumber(Integer foreignersNumber) {
        this.foreignersNumber = foreignersNumber;
    }

    public Double getForeignersPercentage() {
        return foreignersPercentage;
    }

    public void setForeignersPercentage(Double foreignersPercentage) {
        this.foreignersPercentage = foreignersPercentage;
    }

    public Integer getNationalTeamPlayers() {
        return nationalTeamPlayers;
    }

    public void setNationalTeamPlayers(Integer nationalTeamPlayers) {
        this.nationalTeamPlayers = nationalTeamPlayers;
    }

    public String getStadiumName() {
        return stadiumName;
    }

    public void setStadiumName(String stadiumName) {
        this.stadiumName = stadiumName;
    }

    public Integer getStadiumSeats() {
        return stadiumSeats;
    }

    public void setStadiumSeats(Integer stadiumSeats) {
        this.stadiumSeats = stadiumSeats;
    }

    public String getNetTransferRecord() {
        return netTransferRecord;
    }

    public void setNetTransferRecord(String netTransferRecord) {
        this.netTransferRecord = netTransferRecord;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public Integer getLastSeason() {
        return lastSeason;
    }

    public void setLastSeason(Integer lastSeason) {
        this.lastSeason = lastSeason;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
