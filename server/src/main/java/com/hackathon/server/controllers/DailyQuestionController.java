package com.hackathon.server.controllers;

import com.hackathon.server.services.DailyQuestionService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/dailyQuestions"})
public class DailyQuestionController {

    DailyQuestionService dailyQuestionService;
}
