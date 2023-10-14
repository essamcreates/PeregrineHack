package com.hackathon.server.controllers;

import com.hackathon.server.models.PersonalityScore;
import com.hackathon.server.models.dtos.UserPersonalityScoreDTO;
import com.hackathon.server.services.PersonalityScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("personalityScores")
public class PersonalityScoreController {

    @Autowired
    PersonalityScoreService personalityScoreService;

    @GetMapping
    public ResponseEntity<List<PersonalityScore>> getAllPersonalityScores(){
        return new ResponseEntity<>(personalityScoreService.getAllPersonalityScores(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PersonalityScore> getPersonalityScoreById(@PathVariable Long id){
        return new ResponseEntity<>(personalityScoreService.getPersonalityScoreById(id), HttpStatus.OK);
    }

    @GetMapping(value = "user/{userId}")
    public ResponseEntity<Optional<PersonalityScore>> getPersonalityScoreByUser(@PathVariable Long userId){
        Optional<PersonalityScore> userPersonalityScore = personalityScoreService.getPersonalityScoreByUser(userId);
        if(userPersonalityScore.isPresent()){
            return new ResponseEntity<>(userPersonalityScore, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/{userId}")
    public void createUserMoodEntry(@RequestBody UserPersonalityScoreDTO userPersonalityScoreDTO, @PathVariable Long userId){
        personalityScoreService.saveUserPersonalityScore(userPersonalityScoreDTO, userId);
    }



}
