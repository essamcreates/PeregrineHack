package com.hackathon.server.services;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.User;
import com.hackathon.server.repositories.GoalRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

//    public Optional<Goal> getGoalsByUser(Long userId) {
//        Optional<User> user = userRepository.findById(userId);
//        if(user.isPresent()){
//            return user.getCareerGoals();
//        }else{
//            return null;
//        }
//    }

    public 




}
