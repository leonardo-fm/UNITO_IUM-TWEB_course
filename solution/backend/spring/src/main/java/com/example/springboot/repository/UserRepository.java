package com.example.springboot.repository;

import com.example.springboot.entity.Player;
import com.example.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<Player, Long> {

    @Query(value = "SELECT * FROM soccerUser WHERE user_name = :userName", nativeQuery = true)
    User getUser(String userName);

    @Query(value = "INSERT INTO socceruser (user_name, password_hash) VALUES (:userName, :passwordHash)", nativeQuery = true)
    User addUser(String userName, String passwordHash);
}
