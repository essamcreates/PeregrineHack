package com.hackathon.server.services;

import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.repositories.DailyQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DailyQuestionService {
    @Autowired
    DailyQuestionRepository dailyQuestionRepository;
    public List<DailyQuestion> getAllDailyQuestions() {
        return dailyQuestionRepository.findAll();
    }

    public DailyQuestion getDailyQuestionById(Long id) {
        return dailyQuestionRepository.findById(id).get();
    }
}
