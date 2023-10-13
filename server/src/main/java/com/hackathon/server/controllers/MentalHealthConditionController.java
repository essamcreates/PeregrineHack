package com.hackathon.server.controllers;

import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.dtos.UserMentalHealthConditionDTO;
import com.hackathon.server.services.MentalHealthConditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("mentalHealthConditions")
public class MentalHealthConditionController {

    @Autowired
    MentalHealthConditionService mentalHealthConditionService;

    @GetMapping
    public ResponseEntity<List<MentalHealthCondition>> getAllMentalHealthConditions(){
        return new ResponseEntity<>(mentalHealthConditionService.getAllMentalHealthConditions(), HttpStatus.OK);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<MentalHealthCondition> getMentalHealthConditionById(@PathVariable Long id){
        return new ResponseEntity<>(mentalHealthConditionService.getMentalHealthConditionById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Optional<List<MentalHealthCondition>>> getMentalHealthConditionsByUser(@PathVariable Long userId){
        Optional<List<MentalHealthCondition>> userMentalHealthConditions= mentalHealthConditionService.getMentalHealthConditionsByUser(userId);
        if(userMentalHealthConditions.isPresent()){
            return new ResponseEntity<>(mentalHealthConditionService.getMentalHealthConditionsByUser(userId), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping(value = "/{userId}")
    public void createUserMentalHealthConditions(@RequestBody UserMentalHealthConditionDTO userMentalHealthConditionDTO, @PathVariable Long userId){
        mentalHealthConditionService.saveUserMentalHealthConditions(userMentalHealthConditionDTO, userId);
    }
}
