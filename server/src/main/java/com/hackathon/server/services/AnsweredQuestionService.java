package com.hackathon.server.services;

import com.hackathon.server.models.AnsweredQuestion;
import com.hackathon.server.models.DailyQuestion;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.AnsweredQuestionDTO;
import com.hackathon.server.repositories.AnsweredQuestionRepository;
import com.hackathon.server.repositories.DailyQuestionRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnsweredQuestionService {
    @Autowired
    AnsweredQuestionRepository answeredQuestionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    DailyQuestionRepository dailyQuestionRepository;

    public List<AnsweredQuestion> findAllAnsweredQuestions() {
        return answeredQuestionRepository.findAll();
    }


    public AnsweredQuestion findAnsweredQuestionById(Long id) {
        return answeredQuestionRepository.findById(id).get();
    }

    public List<AnsweredQuestion> findAnsweredQuestionsByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        return user.getAnsweredQuestions();
    }

    public void saveUserAnsweredQuestion(AnsweredQuestionDTO answeredQuestionDTO){
        User user = userRepository.findById(answeredQuestionDTO.getUserId()).get();
        DailyQuestion dailyQuestion = dailyQuestionRepository.findById(answeredQuestionDTO.getUserId()).get();
        AnsweredQuestion newAnsweredQuestion = new AnsweredQuestion(
                answeredQuestionDTO.getChosenOption(), dailyQuestion , user);
        answeredQuestionRepository.save(newAnsweredQuestion);
    }

//    POST createAnsweredQuestion
//    DELETE deleteAnsweredQuestion

}



