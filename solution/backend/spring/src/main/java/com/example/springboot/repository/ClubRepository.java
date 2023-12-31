package com.example.springboot.repository;

import com.example.springboot.entity.Club;
import com.example.springboot.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {

    @Query(value = "SELECT * FROM club WHERE club_id = :clubId", nativeQuery = true)
    Club getClub(long clubId);

    @Query(value = "SELECT c.* FROM club AS c " +
            "INNER JOIN competition AS cp " +
            "ON c.domestic_competition_id = cp.domestic_league_code " +
            "WHERE cp.competition_id = :competitionId AND c.last_season >= :season", nativeQuery = true)
    List<Club> getCompetitionSeasonClubs(String competitionId, int season);
}
