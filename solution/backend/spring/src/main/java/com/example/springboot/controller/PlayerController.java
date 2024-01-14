package com.example.springboot.controller;

import com.example.springboot.dto.PlayerDetailDto;
import com.example.springboot.dto.PlayerDto;
import com.example.springboot.entity.Player;
import com.example.springboot.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Operation(summary = "Return a player by Id", description = "Given an Id of a player, return all the data of a player")
    public ResponseEntity<PlayerDetailDto> GetPlayer(@PathVariable long playerId) {
        try {
            Player player = playerService.getPlayer(playerId);
            return new ResponseEntity(new PlayerDetailDto(player), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/club/{clubId}")
    @Operation(summary = "Return a list of player of a club", description = "Given an Id of a club, return all the player that are in the club")
    public ResponseEntity<List<PlayerDto>> GetClubPlayers(@PathVariable long clubId) {
        try {
            List<Player> players = playerService.getClubPlayers(clubId);
            List<PlayerDto> response = new ArrayList<>();
            for (Player player : players) response.add(new PlayerDto(player));
            return new ResponseEntity(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
