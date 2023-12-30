package com.example.springboot.service;

import com.example.springboot.entity.Game;
import com.example.springboot.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<Game> getGames(int take, int offset) {
        return gameRepository.getGames(take, offset);
    }

    public List<Game> getCompetitionGames(int take, int offset, String competitionId, int season) {
        return gameRepository.getCompetitionGames(take, offset, competitionId, season);
    }

    public List<Game> getClubGames(int take, int offset, int clubId, int season) {
        return gameRepository.getClubGames(take, offset, clubId, season);
    }

    public List<Game> getPlayerGames(int take, int offset, int playerId, int season) {
        return gameRepository.getPlayerGames(take, offset, playerId, season);
    }
}
