package com.hackathon.server.controllers;

import com.hackathon.server.models.Goal;
import com.hackathon.server.models.UserResponse;
import com.hackathon.server.models.UserResponse;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.models.dtos.UserResponseDTO;
import com.hackathon.server.repositories.UserResponseRepository;
import com.hackathon.server.services.UserResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("userResponses")
public class UserResponseController {

    @Autowired
    UserResponseService userResponseService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUserResponses(){
        return new ResponseEntity<>(userResponseService.getAllUserResponses(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserResponse> getUserResponseById(@PathVariable Long id){
        return new ResponseEntity<>(userResponseService.getUserResponseById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Optional<List<UserResponse>>> getUserResponsesByUser(@PathVariable Long userId){
        Optional<List<UserResponse>> userResponses= userResponseService.getUserResponsesByUser(userId);
        if(userResponses.isPresent()){
            return new ResponseEntity<>(userResponses, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping(value = "/{userId}")
    public void createUserResponse(@RequestBody UserResponseDTO userResponseDTO, @PathVariable Long userId){
        userResponseService.saveUserResponse(userResponseDTO, userId);
    }
}


