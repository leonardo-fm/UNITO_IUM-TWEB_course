package com.example.springboot.repository;

import com.example.springboot.entity.WinDrawLose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WinDrawLoseRepository extends JpaRepository<WinDrawLose, Integer> {

    @Query(value = "SELECT EXTRACT(YEAR FROM date) AS year, " +
            "SUM(CASE " +
            "WHEN home_club_id = :clubId AND home_club_goals > away_club_goals THEN 1 " +
            "WHEN away_club_id = :clubId AND away_club_goals > home_club_goals THEN 1 " +
            "ELSE 0 END) AS wins, " +
            "SUM(CASE " +
            "WHEN home_club_id = :clubId AND home_club_goals = away_club_goals THEN 1 " +
            "WHEN away_club_id = :clubId AND away_club_goals = home_club_goals THEN 1 " +
            "ELSE 0 END) AS draws, " +
            "SUM(CASE " +
            "WHEN home_club_id = :clubId AND home_club_goals < away_club_goals THEN 1 " +
            "WHEN away_club_id = :clubId AND away_club_goals < home_club_goals THEN 1 " +
            "ELSE 0 END) AS loses " +
            "FROM game WHERE home_club_id = :clubId OR away_club_id = :clubId GROUP BY EXTRACT(YEAR FROM date) ORDER BY year", nativeQuery = true)
    List<WinDrawLose> getWinDrawLose(long clubId);
}

