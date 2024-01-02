package com.example.springboot.controller;

import com.example.springboot.dto.CompetitionDto;
import com.example.springboot.entity.Competition;
import com.example.springboot.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @Autowired
    private final CompetitionService competitionService;

    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    @GetMapping("/{competitionId}")
    public CompetitionDto GetCompetition(@PathVariable String competitionId) {
        Competition competition = competitionService.getCompetition(competitionId);
        List<Integer> seasons = competitionService.getCompetitionSeasons(competitionId);
        return new CompetitionDto(competition, seasons);
    }

    @GetMapping("/all")
    public List<CompetitionDto> GetAllCompetitions() {
        List<Competition> allCompetitions = competitionService.getAllCompetitions();
        List<CompetitionDto> response = new ArrayList<>();
        for (Competition competition : allCompetitions) response.add(new CompetitionDto(competition, null));
        return response;
    }
}
