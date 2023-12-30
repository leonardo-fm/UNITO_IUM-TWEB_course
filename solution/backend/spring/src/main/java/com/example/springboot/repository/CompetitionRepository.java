package com.example.springboot.repository;

import com.example.springboot.entity.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface CompetitionRepository extends JpaRepository<Competition, String> {

    @Query(value = "SELECT c FROM competition c WHERE c.competition_id IN :competitionId", nativeQuery = true)
    Competition findCompetitionById(String competitionId);

    @Query(value = "SELECT * FROM competition", nativeQuery = true)
    List<Competition> getAllCompetitions();
}
