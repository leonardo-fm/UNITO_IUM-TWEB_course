package com.example.springboot.controller;

import com.example.springboot.dto.AvgGoalsDto;
import com.example.springboot.dto.WinDrawLoseDto;
import com.example.springboot.entity.AvgGoals;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.WinDrawLose;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistic")
public class StatisticController {

    /**
     * A dictionary containing the id of the competition and the name
     * is made, so it's easier and faster to retrieve the competitions full name
     */
    private Map<String, Competition> competitions;

    @Autowired
    private final StatisticService statisticService;

    public StatisticController(StatisticService statisticService, CompetitionService competitionService) {
        this.statisticService = statisticService;
        competitions = new HashMap<>();

        List<Competition> allCompetitions = competitionService.getAllCompetitions();
        for (Competition competition : allCompetitions) competitions.put(competition.getId(), competition);
    }

    @GetMapping("/club/{clubId}/winDrawLose")
    @Operation(summary = "Return the win draw lose of a club by year")
    public ResponseEntity<List<WinDrawLoseDto>> GetWinDrawLose(@PathVariable long clubId) {
        try {
            List<WinDrawLose> results = statisticService.getWinDrawLose(clubId);
            List<WinDrawLoseDto> response = new ArrayList<>();
            for (WinDrawLose result : results) response.add(new WinDrawLoseDto(result));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/club/{clubId}/avgGoals")
    @Operation(summary = "Return the average goals of a club by year")
    public ResponseEntity<List<AvgGoalsDto>> GetAvgGoals(@PathVariable long clubId) {
        try {
            List<AvgGoals> results = statisticService.getAvgGoals(clubId);
            List<AvgGoalsDto> response = new ArrayList<>();
            for (AvgGoals result : results) response.add(new AvgGoalsDto(result, competitions.get(result.getCompetitionId())));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
