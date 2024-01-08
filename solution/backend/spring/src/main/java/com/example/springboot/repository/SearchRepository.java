package com.example.springboot.repository;

import com.example.springboot.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SearchRepository extends JpaRepository<Search, String> {

    @Query(value = "SELECT * FROM ( " +
            "SELECT 'club' entity, " +
            "CAST(C.club_id AS character varying) id, " +
            "C.name, " +
            "2 myorder " +
            "FROM club AS C " +
            "UNION " +
            "SELECT 'competition' entity, " +
            "CO.competition_id id, " +
            "CO.name, " +
            "1 myorder " +
            "FROM competition AS CO " +
            "union " +
            "SELECT 'player' entity, " +
            "CAST(P.player_id AS character varying) id, " +
            "P.name, " +
            "3 myorder " +
            "FROM player AS P " +
            ") AS X " +
            "WHERE LOWER(X.name) LIKE CONCAT('%',LOWER(:src),'%') " +
            "ORDER BY X.myorder " +
            "LIMIT :take", nativeQuery = true)
    List<Search> search(String src, int take);
}
