package com.example.springboot.repository;

import com.example.springboot.model.Competition;

import java.util.ArrayList;
import java.util.List;

public class CompetitionRepository {

    public Competition GetCompetition(int competitionId) {
        // Connect to Db and take data
        return new Competition();
    }

    public List<Competition> GetAllCompetitions() {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
