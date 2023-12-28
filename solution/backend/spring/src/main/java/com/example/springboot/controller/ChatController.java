package com.example.springboot.controller;

import com.example.springboot.dto.PlayerDto;
import com.example.springboot.model.Chat;
import com.example.springboot.dto.ChatDto;
import com.example.springboot.repository.ChatRepository;
import com.google.gson.Gson;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @GetMapping("/player/{playerId}")
    public String GetPlayerChat(@PathVariable int playerId) {
        Chat playerChat = new ChatRepository().GetPlayerChat(playerId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new ChatDto());
    }

    @GetMapping("/club/{playerId}")
    public String GetClubChat(@PathVariable int clubId) {
        Chat clubChat = new ChatRepository().GetPlayerChat(clubId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new ChatDto());
    }

    @GetMapping("/competition/{playerId}")
    public String GetCompetitionChat(@PathVariable int competitionId) {
        Chat competitionChat = new ChatRepository().GetPlayerChat(competitionId);
        // Logic
        Gson gson = new Gson();
        return gson.toJson(new ChatDto());
    }
}
