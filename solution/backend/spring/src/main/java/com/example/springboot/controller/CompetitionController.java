package com.example.springboot.controller;

import com.example.springboot.model.Competition;
import com.example.springboot.dto.CompetitionDto;
import com.example.springboot.repository.CompetitionRepository;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/competition")
public class CompetitionController {

    @GetMapping("/all")
    public String GetAllCompetitions() {
        List<Competition> allCompetitions = new CompetitionRepository().GetAllCompetitions();
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new ArrayList<>());
    }

    @GetMapping("/{competitionId}")
    public String GetCompetition(@PathVariable int competitionId) {
        Competition competition = new CompetitionRepository().GetCompetition(competitionId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new CompetitionDto());
    }

    @GetMapping("/details/{competitionId}")
    public String GetCompetitionDetails(@PathVariable int competitionId) {
        Competition competition = new CompetitionRepository().GetCompetition(competitionId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new CompetitionDto());
    }
}
