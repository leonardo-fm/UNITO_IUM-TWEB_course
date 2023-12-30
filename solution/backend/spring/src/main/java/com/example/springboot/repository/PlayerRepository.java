package com.example.springboot.repository;

import com.example.springboot.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class PlayerRepository {

    public Player GetPlayer(int playerId) {
        // Connect to Db and take data
        return new Player();
    }

    public List<Player> GetAllPlayersFromClub(int clubId) {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
