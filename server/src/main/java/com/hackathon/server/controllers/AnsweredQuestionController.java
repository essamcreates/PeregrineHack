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
        return new ResponseEntity<>(this.answeredQuestionService.findAllAnsweredQuestions(), HttpStatus.FOUND);
    }
    @GetMapping
    public ResponseEntity<AnsweredQuestion> getAnsweredQuestionById(@PathVariable Long id){
        AnsweredQuestion answeredQuestion = answeredQuestionService.findAnsweredQuestionsById(id);
        return new ResponseEntity<>(answeredQuestion, HttpStatus.FOUND);
    }

    @GetMapping
    public ResponseEntity<List<AnsweredQuestion>. getAnsweredQuestionByUser(@PathVariable Long id){
        List<AnsweredQuestion> answeredQuestions = answeredQuestionService.getAnsweredQuestionsByUser(id);
        return new ResponseEntity<>(answeredQuestions, HttpStatus.FOUND);
    }
}
