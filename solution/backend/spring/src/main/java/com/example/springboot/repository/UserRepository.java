package com.example.springboot.repository;

import com.example.springboot.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM soccerUser WHERE user_name = :userName", nativeQuery = true)
    User getUser(String userName);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "INSERT INTO socceruser (user_name, password_hash) VALUES (:userName, :passwordHash)", nativeQuery = true)
    void addUser(String userName, String passwordHash);
}
