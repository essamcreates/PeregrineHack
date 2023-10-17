package com.hackathon.server.components;

import com.hackathon.server.models.*;
import com.hackathon.server.models.enums.AccessNeedENUM;
import com.hackathon.server.models.enums.GoalENUM;
import com.hackathon.server.models.enums.MentalHealthConditionENUM;
import com.hackathon.server.repositories.*;
import com.hackathon.server.services.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MentalHealthConditionRepository mentalHealthConditionRepository;

    @Autowired
    AccessNeedRepository accessNeedRepository;

    @Autowired
    DailyQuestionRepository dailyQuestionRepository;

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    MotivationMessageRepository motivationMessageRepository;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<MentalHealthCondition> conditions = Arrays.asList(
                new MentalHealthCondition(MentalHealthConditionENUM.Depression),
                new MentalHealthCondition(MentalHealthConditionENUM.Generalized_Anxiety_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Bipolar_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Schizophrenia),
                new MentalHealthCondition(MentalHealthConditionENUM.Obsessive_Compulsive_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Post_Traumatic_Stress_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Panic_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Social_Anxiety_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Attention_Deficit_Hyperactivity_Disorder),
                new MentalHealthCondition(MentalHealthConditionENUM.Borderline_Personality_Disorder));

        mentalHealthConditionRepository.saveAll(conditions);

        List<MotivationMessage> motivationMessages = Arrays.asList(
                new MotivationMessage("Hello, I hope you had a nice day"),
                new MotivationMessage("Keep Pushing You Will Get There One Day !!!!!!!"),
                new MotivationMessage("Never Back Down"),
                new MotivationMessage("Dont look at yourself through the eyes of the doubters, look from within.")
        );
        motivationMessageRepository.saveAll(motivationMessages);



        List<AccessNeed> accessNeeds = Arrays.asList(
                new AccessNeed(AccessNeedENUM.ADHD),
                new AccessNeed(AccessNeedENUM.DYSLEXIA),
                new AccessNeed(AccessNeedENUM.ASD),
                new AccessNeed(AccessNeedENUM.ALZHEIMERS),
                new AccessNeed(AccessNeedENUM.EPILEPSY),
                new AccessNeed(AccessNeedENUM.BLINDNESS),
                new AccessNeed(AccessNeedENUM.LOW_VISION),
                new AccessNeed(AccessNeedENUM.COLOUR_BLINDNESS),
                new AccessNeed(AccessNeedENUM.TUNNEL_VISION),
                new AccessNeed(AccessNeedENUM.MACULAR_DEGENERATION),
                new AccessNeed(AccessNeedENUM.RETINITIS_PIGMENTOSA),
                new AccessNeed(AccessNeedENUM.DEAFNESS),
                new AccessNeed(AccessNeedENUM.HARD_OF_HEARING),
                new AccessNeed(AccessNeedENUM.AUDITORY_PROCESSING),
                new AccessNeed(AccessNeedENUM.MOBILITY));

        accessNeedRepository.saveAll(accessNeeds);

        List<Goal> goals = Arrays.asList(
                new Goal(GoalENUM.UPSKILL),
                new Goal(GoalENUM.MANAGERIAL),
                new Goal(GoalENUM.TECHNICAL),
                new Goal(GoalENUM.PERSONAL),
                new Goal(GoalENUM.RESKILL),
                new Goal(GoalENUM.HIGHER_EDUCATION),
                new Goal(GoalENUM.LEADERSHIP)
        );
        goalRepository.saveAll(goals);

        List<User> customers = Arrays.asList(
                new User("John", LocalDate.of(1989, 07, 13),"password123", "male", "John@gmail"),
                new User("Sarah", LocalDate.of(1975, 11, 27),"Hello000", "female", "sarah@company")
        );
        userRepository.saveAll(customers);

        List<DailyQuestion> questions = Arrays.asList(
                new DailyQuestion("How would you describe your day so far?","Excellent", "Terrible", "Average", "Ok",null),
                new DailyQuestion("What do you enjoy doing in your spare time","Time with family", "Doing sports", "Discovering new places", "Chilling at home","Going out")
        );
        dailyQuestionRepository.saveAll(questions);

    }
}
