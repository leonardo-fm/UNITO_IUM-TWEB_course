package com.example.springboot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AvgGoals {

    @Id
    @Column(name = "year")
    private Integer year;

    @Column(name = "competition_id")
    private String competitionId;

    @Column(name = "avg_goals")
    private Double avgGoals;

    public AvgGoals() {
    }

    public AvgGoals(Integer year, String competitionId, Double avgGoals) {
        this.year = year;
        this.competitionId = competitionId;
        this.avgGoals = avgGoals;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public Double getAvgGoals() {
        return avgGoals;
    }

    public void setAvgGoals(Double avgGoals) {
        this.avgGoals = avgGoals;
    }
}
