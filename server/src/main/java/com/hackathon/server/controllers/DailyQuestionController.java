package com.hackathon.server.controllers;

import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.services.DailyQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/dailyQuestions"})
public class DailyQuestionController {

//     TO DO
//    GET getAllDailyQuestions
//    GET getDailyQuestionById
//    POST createDailyQuestion
//    DELETE deleteDailyQuestion

    @Autowired
    DailyQuestionService dailyQuestionService;

    public ResponseEntity<List<DailyQuestion>> getAllDailyQuestions(){
        return new List<DailyQuestion>(this.dailyQuestionService.findAllDailyQuestions(), HttpStatus.FOUND);
    }

    public ResponseEntity<DailyQuestion> getDailyQuestionsById(@PathVariable Long id){
        DailyQuestion dailyQuestion = dailyQuestionService.getDailyQuestionById(id);
        return new ResponseEntity<DailyQuestion>(dailyQuestion, HttpStatus.FOUND);
    }


}
