package com.hackathon.server.services;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserGoalDTO;
import com.hackathon.server.models.dtos.UserMentalHealthConditionDTO;
import com.hackathon.server.repositories.MentalHealthConditionRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MentalHealthConditionService {

    @Autowired
    MentalHealthConditionRepository mentalHealthConditionRepository;

    @Autowired
    UserRepository userRepository;

    public List<MentalHealthCondition> getAllMentalHealthConditions() {
        return mentalHealthConditionRepository.findAll();
    }

    public MentalHealthCondition getMentalHealthConditionById(Long id) {
        return mentalHealthConditionRepository.findById(id).get();
    }

    public Optional<List<MentalHealthCondition>> getMentalHealthConditionsByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        List<MentalHealthCondition> conditions = user.getMentalHealthConditions();
        if(!conditions.isEmpty()){
            return Optional.of(conditions);
        }else{
            return Optional.empty();
        }
    }

    public void saveUserMentalHealthConditions(UserMentalHealthConditionDTO userMentalHealthConditionDTO, Long userId){
        User user = userRepository.findById(userId).get();

        user.setMentalHealthConditions(new ArrayList<>());
        for (Long id: userMentalHealthConditionDTO.getMentalHealthConditionIds()){
            MentalHealthCondition condition = mentalHealthConditionRepository.findById(id).get();
            user.addMentalHealthCondition(condition);
            mentalHealthConditionRepository.save(condition);
        }
        userRepository.save(user);
    }
}
