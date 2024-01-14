package com.example.springboot.controller;

import com.example.springboot.dto.GameDto;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {

    /**
     * A dictionary containing the id of the competition and the name
     * is made, so it's easier and faster to retrieve the competitions full name
     */
    private Map<String, Competition> competitions;

    @Autowired
    private final GameService gameService;

    public GameController(GameService gameService, @Autowired CompetitionService competitionService) {
        this.gameService = gameService;
        competitions = new HashMap<>();

        List<Competition> allCompetitions = competitionService.getAllCompetitions();
        for (Competition competition : allCompetitions) competitions.put(competition.getId(), competition);
    }

    @GetMapping("/{gameId}")
    @Operation(summary = "Return a game by Id", description = "Given an Id of a game, return all the data of a game")
    public ResponseEntity<GameDto> GetGame(@PathVariable int gameId) {
        try {
            Game game = gameService.getGame(gameId);
            return new ResponseEntity(new GameDto(game, competitions.get(game.getCompetitionId())), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    @Operation(summary = "Return a list of the last games", description = "Given a date gg-MM-yyyy and a take x and an offset y, return the list of games by date")
    public ResponseEntity<List<GameDto>> GetGames(@RequestParam(name = "date") String date, @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate localDate = LocalDate.parse(date, formatter);
            List<Game> games = gameService.getGames(localDate, take, offset);
            List<GameDto> response = new ArrayList<>();
            for (Game game : games) response.add(new GameDto(game, competitions.get(game.getCompetitionId())));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/competition/{competitionId}/{season}")
    @Operation(summary = "Return a list of the last games of a competition", description = "Given a competition Id and a season, take x by an offset of y, return the list of games by date")
    public ResponseEntity<List<GameDto>> GetGamesOfCompetition(@PathVariable String competitionId, @PathVariable int season, @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        try {
            List<Game> games = gameService.getCompetitionGames(take, offset, competitionId, season);
            List<GameDto> response = new ArrayList<>();
            for (Game game : games) response.add(new GameDto(game, competitions.get(game.getCompetitionId())));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/club/{clubId}/{season}")
    @Operation(summary = "Return a list of the last games of a club", description = "Given a club Id and a season, take x by an offset of y, return the list of games by date")
    public ResponseEntity<List<GameDto>> GetGamesOfClub(@PathVariable long clubId, @PathVariable int season, @RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        try {
            List<Game> games = gameService.getClubGames(take, offset, clubId, season);
            List<GameDto> response = new ArrayList<>();
            for (Game game : games) response.add(new GameDto(game, competitions.get(game.getCompetitionId())));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/player")
    @Operation(summary = "Return a list games", description = "Given a list of game Ids, return the games")
    public ResponseEntity<List<GameDto>> GetGamesOfPlayer(@RequestBody List<Long> games) {
        try {
            List<Game> playerGames = gameService.getPlayerGames(games);
            List<GameDto> response = new ArrayList<>();
            for (Game game : playerGames) response.add(new GameDto(game, competitions.get(game.getCompetitionId())));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
