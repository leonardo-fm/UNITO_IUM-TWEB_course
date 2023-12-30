package com.example.springboot.service;

import com.example.springboot.entity.Club;
import com.example.springboot.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {

    @Autowired
    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public Club getClub(long clubId) {
        return clubRepository.getClub(clubId);
    }

    public List<Club> getCompetitionSeasonClubs(String competitionId, int season) {
        return clubRepository.getCompetitionSeasonClubs(competitionId, season);
    }
}
