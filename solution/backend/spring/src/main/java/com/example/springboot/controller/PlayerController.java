package com.example.springboot.controller;

import com.example.springboot.dto.PlayerDetailDto;
import com.example.springboot.dto.PlayerDto;
import com.example.springboot.entity.Player;
import com.example.springboot.service.GameService;
import com.example.springboot.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/{playerId}")
    public PlayerDetailDto GetPlayer(@PathVariable long playerId) {
        Player player = playerService.getPlayer(playerId);
        return new PlayerDetailDto(player);
    }

    @GetMapping("/club/{clubId}")
    public List<PlayerDto> GetClubPlayers(@PathVariable long clubId) {
        List<Player> players = playerService.getClubPlayers(clubId);
        List<PlayerDto> response = new ArrayList<>();
        for (Player player : players) response.add(new PlayerDto(player));
        return response;
    }
}
