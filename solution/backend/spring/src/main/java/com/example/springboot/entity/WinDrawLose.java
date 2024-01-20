package com.example.springboot.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class WinDrawLose {

    @Id
    @Column(name = "year")
    private Integer year;

    @Column(name = "wins")
    private Long wins;

    @Column(name = "draws")
    private Long draws;

    @Column(name = "loses")
    private Long loses;

    public WinDrawLose() {
    }

    public WinDrawLose(Integer year, Long wins, Long draws, Long loses) {
        this.year = year;
        this.wins = wins;
        this.draws = draws;
        this.loses = loses;
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
