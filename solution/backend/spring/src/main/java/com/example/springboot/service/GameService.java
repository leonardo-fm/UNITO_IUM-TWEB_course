package com.example.springboot.service;

import com.example.springboot.entity.Game;
import com.example.springboot.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GameService {

    @Autowired
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game getGame(long gameId) {
        return gameRepository.getGame(gameId);
    }

    public List<Game> getGames(LocalDate date, int take, int offset) {
        return gameRepository.getGames(date, take, offset);
    }

    public List<Game> getCompetitionGames(int take, int offset, String competitionId, int season) {
        return gameRepository.getCompetitionGames(take, offset, competitionId, season);
    }

    public List<Game> getClubGames(int take, int offset, long clubId, int season) {
        return gameRepository.getClubGames(take, offset, clubId, season);
    }

    public List<Game> getPlayerGames(List<Long> games) {
        return gameRepository.getPlayerGames(games);
    }
}
