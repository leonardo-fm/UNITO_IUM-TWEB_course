package com.example.springboot.controller;

import com.example.springboot.dto.GameDto;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    @Operation(summary = "Return a game by Id", description = "Given an Id of a game, return all the data of a game")
    public GameDto GetGame(@PathVariable int gameId) {
        Game game = gameService.getGame(gameId);
        return new GameDto(game, Competitions.get(game.getCompetitionId()));
    }

    @GetMapping()
    @Operation(summary = "Return a list of the last games", description = "Given a date gg-MM-yyyy and a take x and an offset y, return the list of games by date")
    public List<GameDto> GetGames(@RequestParam(name = "date") String date, @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        LocalDate localDate = LocalDate.parse(date, formatter);
        List<Game> games = gameService.getGames(localDate, take, offset);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @GetMapping("/competition/{competitionId}/{season}")
    @Operation(summary = "Return a list of the last games of a competition", description = "Given a competition Id and a season, take x by an offset of y, return the list of games by date")
    public List<GameDto> GetGamesOfCompetition(@PathVariable String competitionId, @PathVariable int season,
                                                  @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getCompetitionGames(take, offset, competitionId, season);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @GetMapping("/club/{clubId}/{season}")
    @Operation(summary = "Return a list of the last games of a club", description = "Given a club Id and a season, take x by an offset of y, return the list of games by date")
    public List<GameDto> GetGamesOfClub(@PathVariable long clubId, @PathVariable int season,
                                                  @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getClubGames(take, offset, clubId, season);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }

    @PostMapping("/player")
    @Operation(summary = "Return a list games", description = "Given a list of game Ids, return the games")
    public List<GameDto> GetGamesOfPlayer(@RequestBody List<Long> games) {
        List<Game> playerGames = gameService.getPlayerGames(games);
        List<GameDto> response = new ArrayList<>();
        for (Game game : playerGames) response.add(new GameDto(game, Competitions.get(game.getCompetitionId())));
        return response;
    }
}
