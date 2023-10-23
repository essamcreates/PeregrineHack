package com.hackathon.server.openAI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.server.models.UserResponse;
import com.hackathon.server.repositories.UserResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;

@RestController
@RequestMapping("openAI")
public class ChatGPTController {

    @Autowired
    UserResponseRepository userResponseRepository;
    // ^^ should be service and should be a method in service to save?

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody String message) {
        // may be put into a message/request dto
        // send also user logged in
        try {
            String response = chatWithGpt3(message);
//            UserResponse newUserResponse = new UserResponse(message, response, LocalDate.now());
            // possible to remove json and extract string?
//            userResponseRepository.save(newUserResponse);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in communication with OpenAI ChatGPT API.");
        }
    }

    @Autowired
    private ObjectMapper jsonMapper;
    @Value("${openai.api_key}") private String openaiApiKey;
    private HttpClient client = HttpClient.newHttpClient();
    private static final URI CHATGPT_URI = URI.create("https://api.openai.com/v1/completions");

    private String chatWithGpt3(String message) throws Exception {
        var request = HttpRequest.newBuilder()
                .uri(CHATGPT_URI)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + openaiApiKey)
                .POST(chatMessageAsPostBody(message))
                .build();
        var responseBody = client.send(request, HttpResponse.BodyHandlers.ofString()).body();
        var completionResponse = jsonMapper.readValue(responseBody, CompletionResponse.class);
        // store response in table
        return completionResponse.firstAnswer().orElseThrow();
    }

    private HttpRequest.BodyPublisher chatMessageAsPostBody(String message) throws JsonProcessingException {
        var completion = CompletionRequest.defaultWith(message);
        return HttpRequest.BodyPublishers.ofString(jsonMapper.writeValueAsString(completion));
    }
}
