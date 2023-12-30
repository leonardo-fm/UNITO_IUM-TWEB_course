package com.example.springboot.repository;

import com.example.springboot.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

    @Query(value = "SELECT * FROM game WHERE game_id = :gameId", nativeQuery = true)
    Game getGame(long gameId);

    @Query(value = "SELECT * FROM game ORDER BY date DESC, game_id DESC OFFSET :offset LIMIT :take", nativeQuery = true)
    List<Game> getGames(int take, int offset);

    @Query(value = "SELECT * FROM game WHERE competition_id = :competitionId AND season = :season ORDER BY date DESC, game_id DESC OFFSET :offset LIMIT :take", nativeQuery = true)
    List<Game> getCompetitionGames(int take, int offset, String competitionId, int season);

    @Query(value = "SELECT * FROM game WHERE home_club_id = :clubId OR away_club_id = :clubId AND season = :season ORDER BY date DESC, game_id DESC OFFSET :offset LIMIT :take", nativeQuery = true)
    List<Game> getClubGames(int take, int offset, long clubId, int season);

    @Query(value = "SELECT * FROM game WHERE game_id IN (:games)", nativeQuery = true)
    List<Game> getPlayerGames(List<Long> games);
}
