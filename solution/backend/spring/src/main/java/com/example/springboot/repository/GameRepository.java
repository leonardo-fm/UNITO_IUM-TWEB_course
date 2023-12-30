package com.example.springboot.repository;

import com.example.springboot.entity.Game;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GameRepository {

    public Game GetGame(int gameId) {
        // Connect to Db and take data
        return new Game();
    }

    public List<Game> GetAllGame(LocalDate date) {
        // Connect to Db and take data
        return new ArrayList<>();
    }

    public List<Game> GetAllGameOfCompetition(int competitionId) {
        // Connect to Db and take data
        return new ArrayList<>();
    }

    public List<Game> GetAllGameOfPlayer(int playerId) {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
