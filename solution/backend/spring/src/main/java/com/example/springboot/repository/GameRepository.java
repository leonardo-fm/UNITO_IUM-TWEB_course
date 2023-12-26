package com.example.springboot.repository;

import com.example.springboot.dto.GameDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GameRepository {

    public GameDto GetGame(int gameId) {
        // Connect to Db and take data
        return new GameDto();
    }

    public List<GameDto> GetAllCompetitions(LocalDate date) {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
