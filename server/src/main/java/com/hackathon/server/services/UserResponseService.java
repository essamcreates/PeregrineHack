package com.hackathon.server.services;

import com.hackathon.server.models.*;
import com.hackathon.server.models.UserResponse;
import com.hackathon.server.models.UserResponse;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.models.dtos.UserResponseDTO;
import com.hackathon.server.repositories.UserRepository;
import com.hackathon.server.repositories.UserResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserResponseService {

    @Autowired
    UserResponseRepository userResponseRepository;

    @Autowired
    UserRepository userRepository;


    public List<UserResponse> getAllUserResponses() {
        return userResponseRepository.findAll();
    }

    public UserResponse getUserResponseById(Long id) {
        return userResponseRepository.findById(id).get();
    }

//    public Optional<List<UserResponse>> getUserResponsesByUser(Long userId) {
//        User user = userRepository.findById(userId).get();
//        List<UserResponse> responses = user.getUserResponses();
//        if(!responses.isEmpty()){
//            return Optional.of(responses);
//        }else{
//            return Optional.empty();
//        }
//    }

//    public void saveUserResponse(UserResponseDTO userResponseDTO, Long userId){
//        User user = userRepository.findById(userId).get();
//        UserResponse newUserResponse = new UserResponse(
//                userResponseDTO.getUserPrompt(), userResponseDTO.getResponseText(), userResponseDTO.getDateTime());
//        // add user to new user response
//        userResponseRepository.save(newUserResponse);
//    }
}
