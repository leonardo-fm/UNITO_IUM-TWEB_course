package com.example.springboot.service;

import com.example.springboot.dto.PlayerDto;
import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Player;
import com.example.springboot.repository.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    @Autowired
    private final CompetitionRepository competitionRepository;

    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    public Competition getCompetition(String competitionId) {
        Competition competition = competitionRepository.findCompetitionById(competitionId);
        cleanCompetitionName(competition);
        return competition;
    }

    public List<Competition> getAllCompetitions() {
        List<Competition> competitions = competitionRepository.getAllCompetitions();
        for (Competition competition : competitions) cleanCompetitionName(competition);
        return competitions;
    }

    public List<Integer> getCompetitionSeasons(String competitionId) {
        return competitionRepository.getCompetitionSeasons(competitionId);
    }

    private void cleanCompetitionName(Competition competition) {
        String comName = competition.getName();
        comName = comName.replace('-', ' ');
        comName = comName.substring(0, 1).toUpperCase() + comName.substring(1);
        competition.setName(comName);
    }
}
