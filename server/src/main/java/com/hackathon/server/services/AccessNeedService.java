package com.hackathon.server.services;

import com.hackathon.server.models.AccessNeed;
import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.MoodEntry;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.models.dtos.UserAccessNeedDTO;
import com.hackathon.server.models.dtos.UserMentalHealthConditionDTO;
import com.hackathon.server.repositories.AccessNeedRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AccessNeedService {


     @Autowired
     AccessNeedRepository accessNeedRepository;

     @Autowired
     UserRepository userRepository;

     public List<AccessNeed> getAllAccessNeeds() {
      return this.accessNeedRepository.findAll();
     }

     public AccessNeed getAccessNeedById(Long id) {
         return this.accessNeedRepository.findById(id).get();
     }

     public Optional<List<AccessNeed>> getAccessNeedsByUser(Long userId) {
         User user = userRepository.findById(userId).get();
         List<AccessNeed> needs = user.getAccessNeeds();
         if(!needs.isEmpty()){
             return Optional.of(needs);
         }else{
             return Optional.empty();
         }
     }

     public void saveUserAccessNeeds(UserAccessNeedDTO userAccessNeedDTO, Long userId){
         User user = userRepository.findById(userId).get();

         user.setAccessNeeds(new ArrayList<>());
         for (Long id: userAccessNeedDTO.getAccessNeedIds()){
             AccessNeed condition = accessNeedRepository.findById(id).get();
             user.addAccessNeed(condition);
             accessNeedRepository.save(condition);
         }
         userRepository.save(user);
    }


}
