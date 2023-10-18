package com.hackathon.server.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.server.models.PersonalityScore;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserPersonalityScoreDTO;
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

    public PersonalityScore calculateAndSavePersonalityScore() {

/*  TODO:
     Validation of User
     Format request body for PersonalityAPI - DONE
     Send request to PersonalityAPI
     Check ResponseCode
     HandleAPI errors
     Process the PersonalityAPI response
     Save the personality score to the database
   */

        String jsonRequestBody = formatPersonalityAPIRequest(createSampleRequest());

        String jsonResponseBody = sendRequestToApi(jsonRequestBody);


        return null;
    }

    private String formatPersonalityAPIRequest(UserScoreRequestDTO userScoreRequestDTO) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

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
            System.out.println(jsonRequestBody);
            return jsonRequestBody;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private String sendRequestToApi(String jsonRequestBody){

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://personality-quest.p.rapidapi.com/big_five_personality_test/submit_guest_test"))
                .header("X-RapidAPI-Key", "" + personalityApiKey)
                .header("X-RapidAPI-Host", "personality-quest.p.rapidapi.com")
                .method("POST", HttpRequest.BodyPublishers.ofString(jsonRequestBody))
                .build();

        HttpResponse<String> response;

        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        String responseBody = response.body();

        return responseBody;
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

