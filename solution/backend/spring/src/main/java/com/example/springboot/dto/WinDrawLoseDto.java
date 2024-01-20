package com.example.springboot.dto;

import com.example.springboot.entity.WinDrawLose;

public class WinDrawLoseDto {

    private Integer year;
    private Long wins;
    private Long draws;
    private Long loses;

    public WinDrawLoseDto(WinDrawLose winDrawLose) {
        year = winDrawLose.getYear();
        wins = winDrawLose.getWins();
        draws = winDrawLose.getDraws();
        loses = winDrawLose.getLoses();
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Long getWins() {
        return wins;
    }

    public void setWins(Long wins) {
        this.wins = wins;
    }

    public Long getDraws() {
        return draws;
    }

    public void setDraws(Long draws) {
        this.draws = draws;
    }

    public Long getLoses() {
        return loses;
    }

    public void setLoses(Long loses) {
        this.loses = loses;
    }
}
