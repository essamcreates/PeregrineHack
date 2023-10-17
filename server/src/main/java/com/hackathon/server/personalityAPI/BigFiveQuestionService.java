package com.hackathon.server.personalityAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class BigFiveQuestionService {

    @Autowired
    BigFiveQuestionRepository bigFiveQuestionRepository;

    @Value("${personality_quest.api_key}")
    private String personalityApiKey;

//    public String getAllQuestionsFromSentinoApi() throws IOException, InterruptedException {
//        // findAll questions in database
//        // if database is empty call Sentino API
//
////        List<BigFiveQuestion> questions = bigFiveQuestionRepository.findAll();
////
////        if (questions.isEmpty()){
////            retrieveQuestionsFromPersonalityQuestAPI();
////        }
////
////        return questions;
//    }

    public String retrieveQuestionsFromPersonalityQuestAPI() throws IOException, InterruptedException {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://personality-quest.p.rapidapi.com/big_five_personality_test/start_guest_test"))
                .header("X-RapidAPI-Key", "" + personalityApiKey)
                .header("X-RapidAPI-Host", "personality-quest.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();

        List<BigFiveQuestion> bigFiveQuestions = mapQuestionsFromApiToModel(responseBody);

        return response.body();
    }

    public List<BigFiveQuestion> mapQuestionsFromApiToModel(String responseBody) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        List<PersonalityTestDTO> personalityTests = objectMapper.readValue(responseBody, new TypeReference<List<PersonalityTestDTO>>(){});
        System.out.println(personalityTests);

//        PersonalityTestDTO personalityTestDTO = personalityTests.get(0);
//
//        ArrayList<BigFiveQuestion>



        return null;
    }
}
