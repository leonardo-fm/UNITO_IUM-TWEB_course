package com.example.springboot.controller;

import com.example.springboot.dto.GameDto;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {

    private Map<String, Competition> Competitions;

    @Autowired
    private final GameService gameService;

    public GameController(GameService gameService, @Autowired CompetitionService competitionService) {
        this.gameService = gameService;
        Competitions = new HashMap<>();

        List<Competition> allCompetitions = competitionService.getAllCompetitions();
        for (Competition competition : allCompetitions) Competitions.put(competition.getId(), competition);
    }

    @GetMapping("/{gameId}")
    public GameDto GetGame(@PathVariable int gameId) {
        Game game = gameService.getGame(gameId);
        return new GameDto(game, Competitions.get(game.getCompetitionId()));
    }

    @GetMapping()
    public List<GameDto> GetAllGamesInDate(@RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getGames(take, offset);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @GetMapping("/competition/{competitionId}/{season}")
    public List<GameDto> GetAllGamesOfCompetition(@PathVariable String competitionId, @PathVariable int season,
                                                  @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getCompetitionGames(take, offset, competitionId, season);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @GetMapping("/club/{clubId}/{season}")
    public List<GameDto> GetAllGamesOfClub(@PathVariable long clubId, @PathVariable int season,
                                                  @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getClubGames(take, offset, clubId, season);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @PostMapping("/player")
    public List<GameDto> GetGamesOfPlayer(@RequestBody List<Long> games) {
        List<Game> playerGames = gameService.getPlayerGames(games);
        List<GameDto> response = new ArrayList<>();
        for (Game game : playerGames) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }
}
