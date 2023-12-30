package com.example.springboot.repository;

import com.example.springboot.entity.Competition;
import com.example.springboot.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {

    @Query(value = "SELECT * FROM game ORDER BY date DESC, game_id DESC OFFSET :offset LIMIT :take", nativeQuery = true)
    List<Game> getGames(int take, int offset);
}
