package com.example.springboot.controller;

import com.example.springboot.dto.ClubCompetitionSeasonDto;
import com.example.springboot.dto.ClubDto;
import com.example.springboot.dto.CompetitionDto;
import com.example.springboot.entity.Club;
import com.example.springboot.entity.Competition;
import com.example.springboot.service.ClubService;
import com.example.springboot.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/club")
public class ClubController {

    @Autowired
    private final ClubService clubService;

    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    @GetMapping("/{clubId}")
    public ClubDto GetCompetition(@PathVariable int clubId) {
        Club club = clubService.getClub(clubId);
        return new ClubDto(club);
    }

    @GetMapping("/competition/{competitionId}/{season}")
    public List<ClubCompetitionSeasonDto> GetAllCompetitions(@PathVariable String competitionId, @PathVariable int season) {
        List<Club> clubs = clubService.getCompetitionSeasonClubs(competitionId, season);
        List<ClubCompetitionSeasonDto> response = new ArrayList<>();
        for (Club club : clubs) response.add(new ClubCompetitionSeasonDto(club));
        return response;
    }
}
