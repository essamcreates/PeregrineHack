package com.hackathon.server.services;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserGoalDTO;
import com.hackathon.server.repositories.GoalRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    UserRepository userRepository;

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal getGoalById(Long id) {
        return goalRepository.findById(id).get();
    }

    public List<Goal> getGoalsByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getCareerGoals();
    }

    public void saveUserGoals(UserGoalDTO userGoalDTO, Long userId){
        User user = userRepository.findById(userId).get();
        user.setCareerGoals(userGoalDTO.getGoalIds());
    }
}
