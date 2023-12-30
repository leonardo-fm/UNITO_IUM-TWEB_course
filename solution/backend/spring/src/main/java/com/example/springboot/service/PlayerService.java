package com.example.springboot.service;

import com.example.springboot.entity.Player;
import com.example.springboot.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player getPlayer(long playerId) {
        return playerRepository.getPlayer(playerId);
    }

    public List<Player> getClubPlayers(long clubId) {
        return playerRepository.getClubPlayers(clubId);
    }
}
