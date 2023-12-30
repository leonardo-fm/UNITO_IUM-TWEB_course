package com.example.springboot.service;

import com.example.springboot.entity.Competition;
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
}
