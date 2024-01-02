package com.example.springboot.repository;

import com.example.springboot.entity.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface CompetitionRepository extends JpaRepository<Competition, String> {

    @Query(value = "SELECT * FROM competition WHERE competition_id = :competitionId", nativeQuery = true)
    Competition findCompetitionById(String competitionId);

    @Query(value = "SELECT * FROM competition", nativeQuery = true)
    List<Competition> getAllCompetitions();

    @Query(value = "SELECT DISTINCT g.season FROM game AS g INNER JOIN competition AS c ON g.competition_id = c.competition_id WHERE c.competition_id = :competitionId ORDER BY g.season desc", nativeQuery = true)
    List<Integer> getCompetitionSeasons(String competitionId);
}
