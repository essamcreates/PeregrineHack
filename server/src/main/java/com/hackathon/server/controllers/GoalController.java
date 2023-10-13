package com.hackathon.server.controllers;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.dtos.UserGoalDTO;
import com.hackathon.server.services.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("careerGoals")
public class GoalController {

    @Autowired
    GoalService goalService;

    // GET mapping
    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals(){
        return new ResponseEntity<>(goalService.getAllGoals(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Long id){
        return new ResponseEntity<>(goalService.getGoalById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<Optional<List<Goal>>> getGoalsByUser(@PathVariable Long userId){
        Optional<List<Goal>> userGoals= goalService.getGoalsByUser(userId);
        if(userGoals.isPresent()){
            return new ResponseEntity<>(goalService.getGoalsByUser(userId).get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/{userId}")
    public void createUserGoals(@RequestBody UserGoalDTO userGoalDTO, @PathVariable Long userId){
        goalService.saveUserGoals(userGoalDTO, userId);
    }





//    GET getAllGoals
//GET getGoalById
//GET getAllGoalsByUser
//POST createGoal
//DELETE deleteGoal
}
