package com.example.springboot.service;

import com.example.springboot.entity.Competition;
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
        return competitionRepository.findCompetitionById(competitionId);
    }

    public List<Competition> getAllCompetitions() {
        return competitionRepository.getAllCompetitions();
    }
}
