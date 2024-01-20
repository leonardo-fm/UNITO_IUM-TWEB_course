package com.example.springboot.repository;

import com.example.springboot.entity.AvgGoals;
import com.example.springboot.entity.AvgGoalsId;
import com.example.springboot.entity.WinDrawLose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AvgGoalsRepository extends JpaRepository<AvgGoals, AvgGoalsId> {

    @Query(value = "SELECT season as year, competition_id, " +
            "AVG(CASE " +
            "WHEN home_club_id = :clubId THEN home_club_goals " +
            "WHEN away_club_id = :clubId THEN away_club_goals " +
            "ELSE 0 END) AS avg_goals " +
            "FROM game WHERE home_club_id = :clubId OR away_club_id = :clubId GROUP BY season, competition_id", nativeQuery = true)
    List<AvgGoals> getAvgGoals(long clubId);
}
