package com.example.springboot.controller;

import com.example.springboot.model.Player;
import com.example.springboot.dto.PlayerDto;
import com.example.springboot.repository.PlayerRepository;
import com.google.gson.Gson;
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
    public String GetPlayer(@PathVariable int playerId) {
        Player player = new PlayerRepository().GetPlayer(playerId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new PlayerDto());
    }

    @GetMapping("/details/{playerId}")
    public String GetPlayerDetails(@PathVariable int playerId) {
        Player player = new PlayerRepository().GetPlayer(playerId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new PlayerDto());    }

    @GetMapping("/club/{clubId}")
    public String GetAllPlayers(@PathVariable int clubId) {
        List<Player> allPlayers = new PlayerRepository().GetAllPlayersFromClub(clubId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new ArrayList<>());
    }
}
