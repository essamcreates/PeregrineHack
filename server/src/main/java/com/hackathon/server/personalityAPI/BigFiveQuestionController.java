package com.hackathon.server.personalityAPI;

import com.hackathon.server.models.PersonalityScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping({"personalityQuestionnaire"})
public class BigFiveQuestionController {


    @Autowired
    BigFiveQuestionService bigFiveQuestionService;

    //TODO: Add in error handling around the response entity and optionals
    @GetMapping()
    public ResponseEntity<List<BigFiveQuestion>> getPersonalityQuestionnaire() {
        return new ResponseEntity<>(bigFiveQuestionService.getAllQuestions(), HttpStatus.FOUND);
    }

    @GetMapping("/retrieveQuestionsFromAPI")
    public ResponseEntity<List<BigFiveQuestion>> getQuestionsFromPersonalityQuestAPI() throws IOException, InterruptedException {
        return new ResponseEntity<>(bigFiveQuestionService.retrieveQuestionsFromPersonalityQuestAPI(), HttpStatus.FOUND);
    }


    @PostMapping("/personalityQuestionnaireSubmission")
    public ResponseEntity<PersonalityScore> submitPersonalityScoreForCalculation(){
        return new ResponseEntity<>(bigFiveQuestionService.submitPersonalityScoreForCalculation(), HttpStatus.ACCEPTED);
    }

    // TODO: Create POST Mapping to send to API to calculate user score
    // When getting user score
    // Use the data supplied from FE which will be in form of "Strongly Agree" or "1"
    // Construct the URL to send to API
    // Getting all questions from database
    // mapping each user answer to given question
}
