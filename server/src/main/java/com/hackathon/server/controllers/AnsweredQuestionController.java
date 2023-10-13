package com.hackathon.server.controllers;

import com.hackathon.server.models.AnsweredQuestion;
import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.models.dtos.AnsweredQuestionDTO;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.services.AnsweredQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class AnsweredQuestionController {
    @Autowired
    AnsweredQuestionService answeredQuestionService;

    @GetMapping
    public ResponseEntity<List<AnsweredQuestion>> getAllAnsweredQuestions(){
        return new ResponseEntity<>(this.answeredQuestionService.findAllAnsweredQuestions(), HttpStatus.FOUND);
    }
    @GetMapping(value="/{id}")
    public ResponseEntity<AnsweredQuestion> getAnsweredQuestionById(@PathVariable Long id){
        AnsweredQuestion answeredQuestion = answeredQuestionService.findAnsweredQuestionById(id);
        return new ResponseEntity<>(answeredQuestion, HttpStatus.FOUND);
    }

    @GetMapping(value="/user/{userId}")
    public ResponseEntity<List<AnsweredQuestion>> getAnsweredQuestionByUser(@PathVariable Long userId){
        List<AnsweredQuestion> answeredQuestions = answeredQuestionService.findAnsweredQuestionsByUser(userId);
        return new ResponseEntity<>(answeredQuestions, HttpStatus.FOUND);
    }

    @PostMapping
    public void createUserAnsweredQuestion(@RequestBody AnsweredQuestionDTO answeredQuestionDTO){
        answeredQuestionService.saveUserAnsweredQuestion(answeredQuestionDTO);
    }

}
