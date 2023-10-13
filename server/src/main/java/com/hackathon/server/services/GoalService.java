package com.hackathon.server.services;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserGoalDTO;
import com.hackathon.server.repositories.GoalRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Optional<List<Goal>> getGoalsByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        List<Goal> goals = user.getCareerGoals();
        if(!goals.isEmpty()){
            return Optional.of(goals);
        }else{
            return Optional.empty();
        }
    }

    public void saveUserGoals(UserGoalDTO userGoalDTO, Long userId){
        User user = userRepository.findById(userId).get();

        user.setCareerGoals(new ArrayList<>());
        for (Long id: userGoalDTO.getGoalIds()){
            Goal goal = goalRepository.findById(id).get();
            user.addGoal(goal);
            goalRepository.save(goal);
        }
        userRepository.save(user);
    }
}
