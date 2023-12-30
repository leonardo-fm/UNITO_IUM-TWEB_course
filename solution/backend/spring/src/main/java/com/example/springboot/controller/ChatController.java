package com.example.springboot.controller;

import com.example.springboot.entity.Chat;
import com.example.springboot.repository.ChatRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @GetMapping("/player/{playerId}")
    public String GetPlayerChat(@PathVariable int playerId) {
        Chat playerChat = new ChatRepository().GetPlayerChat(playerId);
        return "";
    }

    @GetMapping("/club/{playerId}")
    public String GetClubChat(@PathVariable int clubId) {
        Chat clubChat = new ChatRepository().GetPlayerChat(clubId);
        return "";
    }

    @GetMapping("/competition/{playerId}")
    public String GetCompetitionChat(@PathVariable int competitionId) {
        Chat competitionChat = new ChatRepository().GetPlayerChat(competitionId);
        return "";
    }
}
