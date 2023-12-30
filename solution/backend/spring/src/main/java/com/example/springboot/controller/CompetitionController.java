package com.example.springboot.controller;

import com.example.springboot.entity.Competition;
import com.example.springboot.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/all")
    public List<Competition> GetAllCompetitions() {
        List<Competition> allCompetitions = competitionService.getAllCompetitions();
        return allCompetitions;
    }

    @GetMapping("/{competitionId}")
    public Competition GetCompetition(@PathVariable String competitionId) {
        Competition competition = competitionService.getCompetition(competitionId);
        return competition;
    }

    @GetMapping("/details/{competitionId}")
    public Competition GetCompetitionDetails(@PathVariable String competitionId) {
        Competition competition = competitionService.getCompetition(competitionId);
        return competition;
    }
}
