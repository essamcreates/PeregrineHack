package com.hackathon.server.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.server.models.PersonalityScore;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserPersonalityScoreDTO;
import com.hackathon.server.personalityAPI.PersonalityReport;
import com.hackathon.server.personalityAPI.PersonalityTrait;
import com.hackathon.server.personalityAPI.UserScoreRequestDTO;
import com.hackathon.server.repositories.PersonalityScoreRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
public class PersonalityScoreService {

    @Value("${personality_quest.api_key}")
    private String personalityApiKey;

    @Autowired
    UserService userService;
    
    @Autowired
    PersonalityScoreRepository personalityScoreRepository;

    @Autowired
    UserRepository userRepository;

    public List<PersonalityScore> getAllPersonalityScores() {
        return personalityScoreRepository.findAll();
    }

    public PersonalityScore getPersonalityScoreById(Long id) {
        return personalityScoreRepository.findById(id).get();
    }

//    public Optional<PersonalityScore> getPersonalityScoreByUser(Long userId) {
//        User user = userRepository.findById(userId).get();
//        PersonalityScore userPersonalityScore= user.getPersonalityScore();
//        if(userPersonalityScore!=null){
//            return Optional.of(userPersonalityScore);
//        }else{
//            return Optional.empty();
//        }
//    }

    public Optional<PersonalityScore> getPersonalityScoreByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        PersonalityScore userPersonalityScore = personalityScoreRepository.findByUser(user);
        if (userPersonalityScore != null) {
            return Optional.of(userPersonalityScore);
        } else {
            return Optional.empty();
        }
    }


    public void saveUserPersonalityScore(UserPersonalityScoreDTO userPersonalityScoreDTO, Long userId) {
        User user = userRepository.findById(userId).get();
//        PersonalityScore userPersonalityScore = user.getPersonalityScore();
//        userPersonalityScore.setOpenness(userPersonalityScoreDTO.getOpenness());
//        userPersonalityScore.setConscientiousness(userPersonalityScoreDTO.getConscientiousness());
//        userPersonalityScore.setExtraversion(userPersonalityScoreDTO.getExtraversion());
//        userPersonalityScore.setAgreeableness(userPersonalityScoreDTO.getAgreeableness());
//        userPersonalityScore.setNeuroticism(userPersonalityScoreDTO.getNeuroticism());
        PersonalityScore userPersonalityScore = new PersonalityScore(
                userPersonalityScoreDTO.getOpenness(), userPersonalityScoreDTO.getConscientiousness(), userPersonalityScoreDTO.getExtraversion(),
                userPersonalityScoreDTO.getAgreeableness(), userPersonalityScoreDTO.getNeuroticism(), user);
        personalityScoreRepository.save(userPersonalityScore);
        userRepository.save(user);
    }

    public PersonalityScore calculateAndSavePersonalityScore(UserScoreRequestDTO userScoreRequestDTO) throws JsonProcessingException {

/*  TODO:
     Validation of User
     Format request body for PersonalityAPI - DONE
     Send request to PersonalityAPI - DONE
     Check ResponseCode -
     HandleAPI errors -
     Process the PersonalityAPI response - DONE
     Save the personality score to the database - DONE
   */

        long userId = userScoreRequestDTO.getUserId();
        User user = userService.getUserById(userId);
        Optional<PersonalityScore> currentPersonalityScore = getPersonalityScoreByUser(userId);

        String jsonRequestBody = formatPersonalityAPIRequest(userScoreRequestDTO);

        String jsonResponseBody = submitPersonalityAPIResponse(jsonRequestBody);

        PersonalityScore personalityScore = processPersonalityScore(userId,jsonResponseBody);

        if (getPersonalityScoreByUser(userId).isPresent()) {
            personalityScoreRepository.delete(currentPersonalityScore.get());
            return personalityScoreRepository.save(personalityScore);
        }
        return personalityScoreRepository.save(personalityScore);
    }

    private String formatPersonalityAPIRequest(UserScoreRequestDTO userScoreRequestDTO) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // System.out.println("The sample request body looks like this " + objectMapper.writeValueAsString(userScoreRequestDTO));

            //Construct the JSON body structure
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("personality_test_id", 3);

            List<Map<String, Object>> questionAnswers = new ArrayList<>();
            for (Map<Long, Integer> questionAnswer : userScoreRequestDTO.getQuestionAnswers()) {
                for (Map.Entry<Long, Integer> entry : questionAnswer.entrySet()) {
                    Map<String, Object> answer = new HashMap<>();
                    answer.put("personality_test_question_id", entry.getKey());
                    answer.put("points", entry.getValue());
                    questionAnswers.add(answer);
                }
            }
            requestBody.put("personality_test_questions", questionAnswers);

            //Serialise the JSON
            String jsonRequestBody = objectMapper.writeValueAsString(requestBody);
            System.out.println("The jsonRequestBody looks like this " + jsonRequestBody);
            return jsonRequestBody;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String submitPersonalityAPIResponse(String jsonRequestBody) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://personality-quest.p.rapidapi.com/big_five_personality_test/submit_guest_test"))
                .header("Content-Type", "application/json")
                .header("X-RapidAPI-Key", "" + personalityApiKey)
                .header("X-RapidAPI-Host", "personality-quest.p.rapidapi.com")
                .method("POST", HttpRequest.BodyPublishers.ofString(jsonRequestBody))
                .build();


        HttpResponse<String> response;

        try {
            // API request
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

//            Checks for Success status code
            if (!(response.statusCode() >= 200 && response.statusCode() < 300)){
                throw new RuntimeException("Personality API request failed with status code " + response.statusCode() + response.body());
            }
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        String responseBody = response.body();
        System.out.println(responseBody);

        return responseBody;
    }

    private PersonalityScore processPersonalityScore(long userId, String jsonResponseBody) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();

        PersonalityReport personalityReport = objectMapper.readValue(jsonResponseBody, PersonalityReport.class);

        User user = userService.getUserById(userId);
        
        double opennessScore = personalityReport.getOpenness().getPercentage();
        double conscientiousnessScore = personalityReport.getConscientiousness().getPercentage();
        double extroversionScore = personalityReport.getExtroversion().getPercentage();
        double agreeablenessScore = personalityReport.getAgreeableness().getPercentage();
        double neuroticismScore = personalityReport.getNeuroticism().getPercentage();
        
        PersonalityScore personalityScore = new PersonalityScore(opennessScore, conscientiousnessScore, extroversionScore, agreeablenessScore, neuroticismScore, user);

        return personalityScore;
    }

    public static UserScoreRequestDTO createSampleRequest() {
        int userId = 1;
        List<Map<Long, Integer>> questionAnswers = new ArrayList<>();

        // Create questionAnswers ranging from 42 to 84 with values from 1 to 5
        for (long questionId = 42; questionId <= 84; questionId++) {
            Map<Long, Integer> questionAnswer = new HashMap<>();
            questionAnswer.put(questionId, (int) (Math.random() * 5) + 1); // Random value between 1 and 5
            questionAnswers.add(questionAnswer);
        }
        return new UserScoreRequestDTO((long) userId, questionAnswers);
    }
}

