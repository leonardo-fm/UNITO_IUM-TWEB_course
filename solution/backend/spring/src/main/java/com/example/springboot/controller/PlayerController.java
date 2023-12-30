package com.example.springboot.controller;

import com.example.springboot.entity.Player;
import com.example.springboot.repository.PlayerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {

    @GetMapping("/{playerId}")
    public String GetPlayer(@PathVariable int playerId) {
        Player player = new PlayerRepository().GetPlayer(playerId);
        return "";
    }

    @GetMapping("/details/{playerId}")
    public String GetPlayerDetails(@PathVariable int playerId) {
        Player player = new PlayerRepository().GetPlayer(playerId);
        return "";
    }

    @GetMapping("/club/{clubId}")
    public String GetAllPlayers(@PathVariable int clubId) {
        List<Player> allPlayers = new PlayerRepository().GetAllPlayersFromClub(clubId);
        return "";
    }
}
