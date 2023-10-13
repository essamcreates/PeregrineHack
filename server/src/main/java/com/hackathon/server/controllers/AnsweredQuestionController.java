package com.hackathon.server.controllers;

import com.hackathon.server.models.AnsweredQuestion;
import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.services.AnsweredQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public class AnsweredQuestionController {
    @Autowired
    AnsweredQuestionService answeredQuestionService;

    @GetMapping
    public ResponseEntity<List<AnsweredQuestion>> getAllAnsweredQuestions(){
        return new List<AnsweredQuestion>(this.answeredQuestionService.findAllAnsweredQuestions(), HttpStatus.FOUND);
    }
@GetMapping
    public ResponseEntity<AnsweredQuestion> getDailyQuestionById(@PathVariable Long id){
        AnsweredQuestion answeredQuestion = answeredQuestionService.findAnsweredQuestionById(id);
        return new ResponseEntity<AnsweredQuestion>(answeredQuestion, HttpStatus.FOUND);
    }
}
