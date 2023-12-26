package com.example.springboot.controller;

import com.example.springboot.dto.CompetitionDto;
import com.example.springboot.model.Character;
import com.example.springboot.model.Competition;
import com.example.springboot.repository.CompetitionRepository;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CompetitionController {

    @GetMapping("/all")
    public List<Competition> GetAllCompetitions() {
        List<CompetitionDto> allCompetitions = new CompetitionRepository().GetAllCompetitions();
        // Logic
        return new ArrayList<>();
    }

    @GetMapping("/{competitionId}")
    public Competition GetCompetition(@PathVariable int competitionId) {
        CompetitionDto competition = new CompetitionRepository().GetCompetition(competitionId);
        // Logic
        return new Competition();
    }

    @GetMapping("/details/{competitionId}")
    public Competition GetCompetitionDetails(@PathVariable int competitionId) {
        CompetitionDto competition = new CompetitionRepository().GetCompetition(competitionId);
        // Logic
        return new Competition();
    }
}
