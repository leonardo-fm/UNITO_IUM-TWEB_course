package com.example.springboot.controller;

import com.example.springboot.dto.ClubCompetitionSeasonDto;
import com.example.springboot.dto.ClubDto;
import com.example.springboot.dto.CompetitionDto;
import com.example.springboot.entity.Club;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import com.example.springboot.service.ClubService;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
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
    public ClubDto GetClub(@PathVariable int clubId) {
        Club club = clubService.getClub(clubId);
        Competition competition = competitionService.getCompetition(club.getDomesticCompetitionId());
        return new ClubDto(club, competition);
    }

    @GetMapping("/competition/{competitionId}/{season}")
    public List<ClubCompetitionSeasonDto> GetClubCompetitionsSeason(@PathVariable String competitionId, @PathVariable int season) {
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
                    if (game.getHomeClubId() == club.getId()) {
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
                    if (game.getAwayClubId() == club.getId()) {
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
                } else {
                    // draw
                    draws++;
                    scoredGoals += game.getHomeClubGoals();
                    takenGoals += game.getHomeClubGoals();
                }
            }

            response.add(new ClubCompetitionSeasonDto(club, wins, draws, loses, scoredGoals, takenGoals));
        }
        return response;
    }
}