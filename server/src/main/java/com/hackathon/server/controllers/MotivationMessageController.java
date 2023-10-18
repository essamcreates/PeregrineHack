package com.hackathon.server.controllers;

import com.hackathon.server.models.AccessNeed;
import com.hackathon.server.models.MotivationMessage;
import com.hackathon.server.services.MotivationMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("motivationMessage")
public class MotivationMessageController {

    @Autowired
    MotivationMessageService motivationMessageService;
    @GetMapping("/all")
    public ResponseEntity<List<MotivationMessage>> getAllMotivationMessages(){
        return new ResponseEntity<>(motivationMessageService.getAllMotivationMessages(), HttpStatus.FOUND);
    }

    @GetMapping("/random")
    public ResponseEntity<MotivationMessage> getRandomMotivationMessage(){
        MotivationMessage motivationMessage = motivationMessageService.getRandomMotivationMessages();
        return motivationMessage != null ? new ResponseEntity<>(motivationMessage,HttpStatus.FOUND) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
