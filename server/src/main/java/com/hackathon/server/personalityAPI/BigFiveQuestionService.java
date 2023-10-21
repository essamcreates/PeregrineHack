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

    public List<BigFiveQuestion> retrieveQuestionsFromPersonalityQuestAPI() throws IOException, InterruptedException {

        bigFiveQuestionRepository.deleteAll();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://personality-quest.p.rapidapi.com/big_five_personality_test/start_guest_test"))
                .header("X-RapidAPI-Key", "" + personalityApiKey)
                .header("X-RapidAPI-Host", "personality-quest.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        String responseBody = response.body();

        List<BigFiveQuestion> bigFiveQuestions = handleAPIResponse(responseBody);

        return bigFiveQuestions;
    }

    public List<BigFiveQuestion> handleAPIResponse(String responseBody) throws JsonProcessingException {

        ArrayList<BigFiveQuestion> personalityTestQuestions = new ArrayList<>();

        if (bigFiveQuestionRepository.count() == 0) {

            ObjectMapper objectMapper = new ObjectMapper();
            List<PersonalityTestDTO> personalityTests = objectMapper.readValue(responseBody, new TypeReference<List<PersonalityTestDTO>>() {
            });

            PersonalityTestDTO personalityTestDTO = personalityTests.get(0);

            for (int i = 0; i < personalityTestDTO.getPersonalityTestQuestions().size(); i++) {
                PersonalityTestQuestionDTO personalityQuestion = personalityTestDTO.getPersonalityTestQuestions().get(i);

                BigFiveQuestion bigFiveQuestion = new BigFiveQuestion(personalityQuestion.getPersonalityTestQuestionId(), personalityQuestion.getQuestion());
                personalityTestQuestions.add(bigFiveQuestion);
            }

            bigFiveQuestionRepository.saveAll(personalityTestQuestions);

        }

        return personalityTestQuestions;
    }

    public List<BigFiveQuestion> getAllQuestions() {
        return bigFiveQuestionRepository.findAll();
    }
}
