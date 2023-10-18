package com.hackathon.server.personalityAPI;

import com.hackathon.server.models.PersonalityScore;
import com.hackathon.server.services.PersonalityScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping({"personalityQuestionnaire"})
public class BigFiveQuestionController {


    @Autowired
    BigFiveQuestionService bigFiveQuestionService;

    @Autowired
    PersonalityScoreService personalityScoreService;

//    @Autowired
//    UserScoreRequestDTO userScoreRequestDTO;

    //TODO: Add in error handling around the response entity and optionals
    @GetMapping()
    public ResponseEntity<List<BigFiveQuestion>> getPersonalityQuestionnaire() {
        return new ResponseEntity<>(bigFiveQuestionService.getAllQuestions(), HttpStatus.FOUND);
    }

    @GetMapping("/retrieveQuestionsFromAPI")
    public ResponseEntity<List<BigFiveQuestion>> getQuestionsFromPersonalityQuestAPI() throws IOException, InterruptedException {
        return new ResponseEntity<>(bigFiveQuestionService.retrieveQuestionsFromPersonalityQuestAPI(), HttpStatus.FOUND);
    }


//    @PostMapping("/calculate-personality-score")
//    public ResponseEntity<String> calculatePersonalityScore(@RequestBody UserScoreRequestDTO userScoreRequestDTO){
//        try{
//            PersonalityScore personalityScore = personalityScoreService.calculateAndSavePersonalityScore(userScoreRequestDTO);
//            return ResponseEntity.ok("Personality score calculated and saved");
//        } catch (IllegalAccessException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

    // TODO: Create POST Mapping to send to API to calculate user score
    // Pseudo code 1
    // When getting user score
    // Use the data supplied from FE which will be in form of "Strongly Agree" or "1"
    // Construct the URL to send to API
    // Getting all questions from database
    // mapping each user answer to given question

    // Receive user score JSON object from FE containing user_id and then a list of tuples with question_id and answer
    // From this information take the list and format to the request body of the personality API
    // if response code is 200
    //      get score percentage of each personality trait and create a personality score with the user id as as well and save to the database
    // else
    //      Throw error and display error to console


//    import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;

//    @RestController
//    public class PersonalityScoreController {
//        private final RestTemplate restTemplate;
//        private final PersonalityScoreService personalityScoreService;
//
//        // Constructor for dependency injection
//        public PersonalityScoreController(RestTemplate restTemplate, PersonalityScoreService personalityScoreService) {
//            this.restTemplate = restTemplate;
//            this.personalityScoreService = personalityScoreService;
//        }
//
//        @PostMapping("/calculate-personality-score")
//        public ResponseEntity<String> calculatePersonalityScore(@RequestBody UserScoreRequest userScoreRequest) {
//            try {
//                // Validation of userScoreRequest
//                if (!isValidUserScoreRequest(userScoreRequest)) {
//                    return ResponseEntity.badRequest().body("Invalid user score request");
//                }
//
//                // Format request body for Personality API
//                PersonalityApiRequest apiRequest = formatPersonalityAPIRequest(userScoreRequest);
//
//                // Send request to Personality API
//                ResponseEntity<ApiResponse> apiResponse = restTemplate.postForEntity(
//                        "https://personality-api-url", apiRequest, ApiResponse.class);
//
//                // Check the response code
//                if (apiResponse.getStatusCode().is2xxSuccessful()) {
//                    // Process the Personality API response
//                    PersonalityScore personalityScore = processPersonalityAPIResponse(apiResponse.getBody());
//
//                    // Save the personality score to the database
//                    personalityScoreService.savePersonalityScore(personalityScore);
//
//                    return ResponseEntity.ok("Personality score calculated and saved.");
//                } else {
//                    // Handle API errors
//                    handleAPIErrors(apiResponse);
//                    return ResponseEntity.status(apiResponse.getStatusCode()).body("Personality API request failed");
//                }
//            } catch (Exception e) {
//                // Handle unexpected errors
//                e.printStackTrace();
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
//            }
//        }
//
//        private boolean isValidUserScoreRequest(UserScoreRequest userScoreRequest) {
//            // Implement your validation logic here
//            // Return true if the request is valid, false otherwise
//        }
//
//        private PersonalityApiRequest formatPersonalityAPIRequest(UserScoreRequest userScoreRequest) {
//            // Implement request formatting logic here
//        }
//
//        private PersonalityScore processPersonalityAPIResponse(ApiResponse apiResponse) {
//            // Implement response processing logic here
//        }
//
//        private void handleAPIErrors(ResponseEntity<ApiResponse> apiResponse) {
//            // Implement error handling logic here, log the error, and potentially send notifications.
//        }
//    }

}
