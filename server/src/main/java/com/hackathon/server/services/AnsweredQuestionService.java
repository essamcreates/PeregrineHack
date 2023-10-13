package com.hackathon.server.services;

import com.hackathon.server.models.AnsweredQuestion;
import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.models.User;
import com.hackathon.server.repositories.AnsweredQuestionRepository;
import com.hackathon.server.repositories.DailyQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnsweredQuestionService {
    @Autowired
    AnsweredQuestionRepository answeredQuestionRepository;

    public List<AnsweredQuestion> findAllAnsweredQuestions() {
        return answeredQuestionRepository.findAll();
    }


        public AnsweredQuestion findAnsweredQuestionById(Long id) {
            return answeredQuestionRepository.findById(id).get();
        }
    }

    GET getAllAnsweredQuestions
    GET getAnsweredQuestionById
    GET getAllAnsweredQuestionsByUser
    POST createAnsweredQuestion
    DELETE deleteAnsweredQuestion

}



