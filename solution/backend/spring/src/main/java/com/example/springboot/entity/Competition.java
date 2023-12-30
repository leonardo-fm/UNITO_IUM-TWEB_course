package com.example.springboot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "competition")
public class Competition {

    @Id
    @Column(name = "competition_id")
    private String id;

    @Column(name = "competition_code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "sub_type")
    private String competitionSubType;

    @Column(name = "type")
    private String competitionType;

    @Column(name = "country_id")
    private int countryId;

    @Column(name = "country_name")
    private String countryName;

    @Column(name = "domestic_league_code")
    private String domesticLeagueCode;

    @Column(name = "confederation")
    private String confederation;

    @Column(name = "url")
    private String url;

    public Competition() {
    }

    public Competition(String id, String code, String name, String competitionSubType, String competitionType, int countryId, String countryName, String domesticLeagueCode, String confederation, String url) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.competitionSubType = competitionSubType;
        this.competitionType = competitionType;
        this.countryId = countryId;
        this.countryName = countryName;
        this.domesticLeagueCode = domesticLeagueCode;
        this.confederation = confederation;
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getCompetitionSubType() {
        return competitionSubType;
    }

    public void setCompetitionSubType(String competitionSubType) {
        this.competitionSubType = competitionSubType;
    }

    public String getCompetitionType() {
        return competitionType;
    }

    public void setCompetitionType(String competitionType) {
        this.competitionType = competitionType;
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

    public String getDomesticLeagueCode() {
        return domesticLeagueCode;
    }

    public void setDomesticLeagueCode(String domesticLeagueCode) {
        this.domesticLeagueCode = domesticLeagueCode;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
