package com.example.springboot.repository;

import com.example.springboot.dto.CompetitionDto;

import java.util.ArrayList;
import java.util.List;

public class CompetitionRepository {

    public CompetitionDto GetCompetition(int competitionId) {
        // Connect to Db and take data
        return new CompetitionDto();
    }

    public List<CompetitionDto> GetAllCompetitions() {
        // Connect to Db and take data
        return new ArrayList<>();
    }
}
