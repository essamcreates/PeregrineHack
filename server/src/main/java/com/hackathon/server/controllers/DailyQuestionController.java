package com.hackathon.server.controllers;

import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.services.DailyQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/dailyQuestions"})
public class DailyQuestionController {


    @Autowired
    DailyQuestionService dailyQuestionService;
@GetMapping
    public ResponseEntity<List<DailyQuestion>> getAllDailyQuestions(){
        return new List<DailyQuestion>(this.dailyQuestionService.findAllDailyQuestions(), HttpStatus.FOUND);
    }
@GetMapping
    public ResponseEntity<DailyQuestion> getDailyQuestionById(@PathVariable Long id){
        DailyQuestion dailyQuestion = dailyQuestionService.findDailyQuestionById(id);
        return new ResponseEntity<DailyQuestion>(dailyQuestion, HttpStatus.FOUND);
    }


}
