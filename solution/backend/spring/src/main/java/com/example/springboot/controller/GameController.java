package com.example.springboot.controller;

import com.example.springboot.dto.GameDto;
import com.example.springboot.model.Game;
import com.example.springboot.repository.GameRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @GetMapping("/{gameDate}")
    public List<Game> GetAllGamesInDate(@PathVariable LocalDate gameDate) {
        List<GameDto> allGames = new GameRepository().GetAllGame(gameDate);
        // Logic
        return new ArrayList<>();
    }

    @GetMapping("/competition/{competitionId}")
    public List<Game> GetAllGamesOfCompetition(@PathVariable int competitionId) {
        List<GameDto> allGames = new GameRepository().GetAllGameOfCompetition(competitionId);
        // Logic
        return new ArrayList<>();
    }

    @GetMapping("/player/{playerId}")
    public List<Game> GetAllGamesOfPlayer(@PathVariable int playerId) {
        List<GameDto> allGames = new GameRepository().GetAllGameOfPlayer(playerId);
        // Logic
        return new ArrayList<>();
    }

    @GetMapping("/{gameId}")
    public Game GetGame(@PathVariable int gameId) {
        GameDto game = new GameRepository().GetGame(gameId);
        // Logic
        return new Game();
    }
}
