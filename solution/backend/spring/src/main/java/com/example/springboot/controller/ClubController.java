package com.example.springboot.controller;

import com.example.springboot.dto.ClubCompetitionSeasonDto;
import com.example.springboot.dto.ClubDto;
import com.example.springboot.entity.Club;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import com.example.springboot.service.ClubService;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private final CompetitionService competitionService;

    @Autowired
    private final GameService gameService;

    public ClubController(ClubService clubService, CompetitionService competitionService, GameService gameService) {
        this.clubService = clubService;
        this.competitionService = competitionService;
        this.gameService = gameService;
    }

    @GetMapping("/{clubId}")
    @Operation(summary = "Return a club by Id", description = "Given an Id of a club, return all the data of a club")
    public ResponseEntity<ClubDto> GetClub(@PathVariable int clubId) {
        try {
            Club club = clubService.getClub(clubId);
            Competition competition = competitionService.getCompetition(club.getDomesticCompetitionId());
            return new ResponseEntity(new ClubDto(club, competition), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/competition/{competitionId}/{season}")
    @Operation(summary = "Return all the data of clubs in a competition", description = "Given an Id of a competition and a season, return all the data for all the clubs playing the competition")
    public ResponseEntity<List<ClubCompetitionSeasonDto>> GetClubCompetitionsSeason(@PathVariable String competitionId, @PathVariable int season) {
        try {
            List<Club> clubs = clubService.getCompetitionSeasonClubs(competitionId, season);
            List<Game> games = gameService.getCompetitionGames(10000, 0, competitionId, season);
            List<ClubCompetitionSeasonDto> response = new ArrayList<>();
            for (Club club : clubs) {
                List<Game> playedGames = games.stream()
                        .filter(x -> x.getHomeClubId().longValue() == club.getId().longValue() || x.getAwayClubId().longValue() == club.getId().longValue())
                        .toList();

                int wins = 0, draws = 0, loses = 0, scoredGoals = 0, takenGoals = 0;
                for (Game game : playedGames) {
                    if (game.getHomeClubGoals() > game.getAwayClubGoals()) {
                        // home win
                        if (game.getHomeClubId().longValue() == club.getId()) {
                            // have win
                            wins++;
                            scoredGoals += game.getHomeClubGoals();
                            takenGoals += game.getAwayClubGoals();
                        } else {
                            // have lost
                            loses++;
                            scoredGoals += game.getAwayClubGoals();
                            takenGoals += game.getHomeClubGoals();
                        }
                    } else if (game.getHomeClubGoals() < game.getAwayClubGoals()) {
                        // away win
                        if (game.getAwayClubId().longValue() == club.getId()) {
                            // have win
                            wins++;
                            scoredGoals += game.getAwayClubGoals();
                            takenGoals += game.getHomeClubGoals();
                        } else {
                            // have lost
                            loses++;
                            scoredGoals += game.getHomeClubGoals();
                            takenGoals += game.getAwayClubGoals();
                        }
                    } else {
                        // draw
                        draws++;
                        scoredGoals += game.getHomeClubGoals();
                        takenGoals += game.getHomeClubGoals();
                    }
                }

                if (wins + loses + draws != 0)
                    response.add(new ClubCompetitionSeasonDto(club, wins, draws, loses, scoredGoals, takenGoals));
            }
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
