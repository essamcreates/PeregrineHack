package com.hackathon.server.services;
import com.hackathon.server.models.MotivationMessage;

import com.hackathon.server.repositories.MotivationMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MotivationMessageService {

    @Autowired
    MotivationMessageRepository motivationMessageRepository;

    public List<MotivationMessage> getAllMotivationMessages() {
        return motivationMessageRepository.findAll();
    }

    public MotivationMessage getRandomMotivationMessages() {
        Long min = 1L;
        Long max = motivationMessageRepository.getLastMotivationalMessageId();

        if(max==null){
            return null;
        }

        Long randomNumber = (long) (Math.random() * (max - min + 1) + min);

        return motivationMessageRepository.findById(randomNumber).get();
    }

}
