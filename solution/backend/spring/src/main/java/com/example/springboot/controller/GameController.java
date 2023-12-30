package com.example.springboot.controller;

import com.example.springboot.entity.Game;
import com.example.springboot.repository.GameRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @GetMapping("/{gameDate}")
    public String GetAllGamesInDate(@PathVariable LocalDate gameDate) {
        List<Game> allGames = new GameRepository().GetAllGame(gameDate);
        return "";
    }

    @GetMapping("/competition/{competitionId}")
    public String GetAllGamesOfCompetition(@PathVariable int competitionId) {
        List<Game> allGames = new GameRepository().GetAllGameOfCompetition(competitionId);
        return "";
    }

    @GetMapping("/player/{playerId}")
    public String GetAllGamesOfPlayer(@PathVariable int playerId) {
        List<Game> allGames = new GameRepository().GetAllGameOfPlayer(playerId);
        return "";
    }

    @GetMapping("/{gameId}")
    public String GetGame(@PathVariable int gameId) {
        Game game = new GameRepository().GetGame(gameId);
        return "";
    }
}
