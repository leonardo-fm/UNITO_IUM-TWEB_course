package com.example.springboot.service;

import com.example.springboot.entity.AvgGoals;
import com.example.springboot.entity.WinDrawLose;
import com.example.springboot.repository.AvgGoalsRepository;
import com.example.springboot.repository.WinDrawLoseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticService {

    @Autowired
    private final WinDrawLoseRepository winDrawLoseRepository;

    @Autowired
    private final AvgGoalsRepository avgGoalsRepository;

    public StatisticService(WinDrawLoseRepository winDrawLoseRepository, AvgGoalsRepository avgGoalsRepository) {
        this.winDrawLoseRepository = winDrawLoseRepository;
        this.avgGoalsRepository = avgGoalsRepository;
    }

    public List<WinDrawLose> getWinDrawLose(long clubId) {
        return winDrawLoseRepository.getWinDrawLose(clubId);
    }

    public List<AvgGoals> getAvgGoals(long clubId) {
        return avgGoalsRepository.getAvgGoals(clubId);
    }
}
