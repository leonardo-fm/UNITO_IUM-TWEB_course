package com.example.springboot.controller;

import com.example.springboot.dto.PlayerDto;
import com.example.springboot.model.Player;
import com.example.springboot.repository.PlayerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {

    @GetMapping("/{playerId}")
    public Player GetPlayer(@PathVariable int playerId) {
        PlayerDto player = new PlayerRepository().GetPlayer(playerId);
        // Logic
        return new Player();
    }

    @GetMapping("/details/{playerId}")
    public Player GetPlayerDetails(@PathVariable int playerId) {
        PlayerDto player = new PlayerRepository().GetPlayer(playerId);
        // Logic
        return new Player();
    }

    @GetMapping("/club/{clubId}")
    public List<Player> GetAllPlayers(@PathVariable int clubId) {
        List<PlayerDto> allPlayers = new PlayerRepository().GetAllPlayersFromClub(clubId);
        // Logic
        return new ArrayList<>();
    }
}
