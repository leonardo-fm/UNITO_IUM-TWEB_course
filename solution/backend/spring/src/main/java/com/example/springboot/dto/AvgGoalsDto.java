package com.example.springboot.dto;

import com.example.springboot.entity.AvgGoals;
import com.example.springboot.entity.Competition;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class AvgGoalsDto {

    private Integer year;
    private String competitionName;
    private double avgGoals;

    public AvgGoalsDto(AvgGoals avgGoalsEntity, Competition competition) {
        year = avgGoalsEntity.getYear();
        competitionName = competition.getName();
        avgGoals = BigDecimal.valueOf(avgGoalsEntity.getAvgGoals())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getCompetitionName() {
        return competitionName;
    }

    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    public double getAvgGoals() {
        return avgGoals;
    }

    public void setAvgGoals(double avgGoals) {
        this.avgGoals = avgGoals;
    }
}
