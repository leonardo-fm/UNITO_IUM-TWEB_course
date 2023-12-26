package com.example.springboot.repository;

import com.example.springboot.dto.PlayerDto;

import java.util.ArrayList;
import java.util.List;

public class PlayerRepository {

    public PlayerDto GetPlayer(int playerId) {
        // Connect to Db and take data
        return new PlayerDto();
    }

    public List<PlayerDto> GetAllPlayersFromClub(int clubId) {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
