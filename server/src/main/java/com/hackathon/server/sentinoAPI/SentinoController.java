package com.hackathon.server.sentinoAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"sentino"})
public class SentinoController {

    // TODO :
    // GET request to Sentino API on RapidAPI.com to get 30 questions for questionnaire
    // Store 30 questions on our database

    @Autowired
    SentinoService sentinoService;

    @GetMapping("/retrieveQuestions")
    public ResponseEntity<List<BigFiveQuestion>> getQuestionsFromSentinoAPI(){
        return new ResponseEntity<>(sentinoService.getAllQuestionsFromSentinoApi(), HttpStatus.FOUND);
    }


    // TODO:
    // Table in the database so repository is needed
    // Question model
        // QuestionId
        // Question
    // List<Question> Questions


    // REST GET Mapping available to FE
    // Display questions

    // When getting user score
    // Use the data supplied from FE which will be in form of "Strongly Agree" or "1"
    // Construct the URL to send to Sentino API
    // Getting all questions from database
    // mapping each user answer to given question
}
