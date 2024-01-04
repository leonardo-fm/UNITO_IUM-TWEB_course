package com.example.springboot.repository;

import com.example.springboot.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query(value = "SELECT * FROM player WHERE player_id = :playerId", nativeQuery = true)
    Player getPlayer(long playerId);

    @Query(value = "SELECT p.* FROM player AS p INNER JOIN club AS c ON p.last_season = c.last_season WHERE p.current_club_id = :clubId AND c.club_id = :clubId", nativeQuery = true)
    List<Player> getClubPlayers(long clubId);
}
