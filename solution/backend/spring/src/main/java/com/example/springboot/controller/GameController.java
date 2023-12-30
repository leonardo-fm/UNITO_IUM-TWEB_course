package com.example.springboot.controller;

import com.example.springboot.dto.GameDto;
import com.example.springboot.entity.Game;
import com.example.springboot.repository.GameRepository;
import com.example.springboot.service.CompetitionService;
import com.example.springboot.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping()
    public List<GameDto> GetAllGamesInDate(@RequestParam(name = "take") int take, @RequestParam(name = "offset") int offset) {
        List<Game> games = gameService.getGames(take, offset);
        List<GameDto> response = new ArrayList<>();
        for (Game game : games) response.add(new GameDto(game));
        return response;
    }

//    @GetMapping("/competition/{competitionId}")
//    public String GetAllGamesOfCompetition(@PathVariable int competitionId) {
//        List<Game> allGames = new GameRepository().GetAllGameOfCompetition(competitionId);
//        return "";
//    }
//
//    @GetMapping("/player/{playerId}")
//    public String GetAllGamesOfPlayer(@PathVariable int playerId) {
//        List<Game> allGames = new GameRepository().GetAllGameOfPlayer(playerId);
//        return "";
//    }
//
//    @GetMapping("/{gameId}")
//    public String GetGame(@PathVariable int gameId) {
//        Game game = new GameRepository().GetGame(gameId);
//        return "";
//    }
}
