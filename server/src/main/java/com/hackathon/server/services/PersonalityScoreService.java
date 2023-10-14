package com.hackathon.server.services;

import com.hackathon.server.models.PersonalityScore;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserPersonalityScoreDTO;
import com.hackathon.server.repositories.PersonalityScoreRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalityScoreService {

    @Autowired
    PersonalityScoreRepository personalityScoreRepository;

    @Autowired
    UserRepository userRepository;

    public List<PersonalityScore> getAllPersonalityScores() {
        return personalityScoreRepository.findAll();
    }

    public PersonalityScore getPersonalityScoreById(Long id) {
        return personalityScoreRepository.findById(id).get();
    }

    public Optional<PersonalityScore> getPersonalityScoreByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        PersonalityScore userPersonalityScore= user.getPersonalityScore();
        if(userPersonalityScore!=null){
            return Optional.of(userPersonalityScore);
        }else{
            return Optional.empty();
        }
    }

    public void saveUserPersonalityScore(UserPersonalityScoreDTO userPersonalityScoreDTO, Long userId){
        User user = userRepository.findById(userId).get();
//        PersonalityScore userPersonalityScore = user.getPersonalityScore();
//        userPersonalityScore.setOpenness(userPersonalityScoreDTO.getOpenness());
//        userPersonalityScore.setConscientiousness(userPersonalityScoreDTO.getConscientiousness());
//        userPersonalityScore.setExtraversion(userPersonalityScoreDTO.getExtraversion());
//        userPersonalityScore.setAgreeableness(userPersonalityScoreDTO.getAgreeableness());
//        userPersonalityScore.setNeuroticism(userPersonalityScoreDTO.getNeuroticism());
        PersonalityScore userPersonalityScore = new PersonalityScore(
                userPersonalityScoreDTO.getOpenness(),userPersonalityScoreDTO.getConscientiousness(), userPersonalityScoreDTO.getExtraversion(),
                userPersonalityScoreDTO.getAgreeableness(), userPersonalityScoreDTO.getNeuroticism() ,user);
        personalityScoreRepository.save(userPersonalityScore);
        userRepository.save(user);
    }

}
