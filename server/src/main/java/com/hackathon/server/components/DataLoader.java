package com.hackathon.server.components;

import com.hackathon.server.configurations.PropertiesConfig;
import com.hackathon.server.models.*;
import com.hackathon.server.models.enums.AccessNeedENUM;
import com.hackathon.server.models.enums.GoalENUM;
import com.hackathon.server.models.enums.MentalHealthConditionENUM;
import com.hackathon.server.personalityAPI.BigFiveQuestion;
import com.hackathon.server.personalityAPI.BigFiveQuestionRepository;
import com.hackathon.server.repositories.*;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
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

    @Autowired
    BigFiveQuestionRepository bigFiveQuestionRepository;

    @Autowired
    PersonalityScoreRepository personalityScoreRepository;

    @Autowired
    NoteRepository noteRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (mentalHealthConditionRepository.count() == 0) {

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
        }

        if (motivationMessageRepository.count() == 0) {
            List<MotivationMessage> motivationMessages = Arrays.asList(
                    new MotivationMessage("Slow down, you'll get there faster"),
                    new MotivationMessage("Rejection is redirection"),
                    new MotivationMessage("Every morning we are born again"),
                    new MotivationMessage("Everything is hard before it is easy"),
                    new MotivationMessage("You are the greatest project you will ever work on"),
                    new MotivationMessage("First you dream, then you do"),
                    new MotivationMessage("Energy goes when intention flows"),
                    new MotivationMessage("Nature does not hurry, yet everything blooms"),
                    new MotivationMessage("When things change inside, things change around")
            );
            motivationMessageRepository.saveAll(motivationMessages);
        }

        if (accessNeedRepository.count() == 0) {
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
        }

        if (goalRepository.count() == 0) {
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
        }

        if (userRepository.count() == 0) {
            List<User> users = Arrays.asList(
                    new User("John","Software Engineer", LocalDate.of(1989, 7, 13), "password123", "male", "John@gmail", PropertiesConfig.getDefaultProfilePhoto()),
                    new User("Sarah","Software Engineer",LocalDate.of(1975, 11, 27), "Hello000", "female", "sarah@company",PropertiesConfig.getDefaultProfilePhoto())
            );
            userRepository.saveAll(users);
        }

        if (dailyQuestionRepository.count() == 0) {
            List<DailyQuestion> dailyQuestions = Arrays.asList(
                    new DailyQuestion("What aspect of your life would you like to focus on for personal growth?", "Relationships", "Career", "Health and well-being", "Emotional intelligence", null),
                    new DailyQuestion("How do you prefer to practice mindfulness?", "Worship", "Deep breathing exercises", "Mindful walking", "Meditation", null),
            new DailyQuestion("What motivates you the most?", "Achieving personal goals", "Making a difference in the world", "Recognition and praise", "Overcoming challenges", null),
                    new DailyQuestion("How do you approach goal setting?", "Setting SMART goals", "Mentor guidance", "Visualizing success", "Breaking goals down into steps", null),
                    new DailyQuestion("Which skill are you keen on developing further?", "Digital marketing", "Data analysis", "Time management", "Public speaking", null),

            );
            dailyQuestionRepository.saveAll(dailyQuestions);
        }

        if (bigFiveQuestionRepository.count() == 0) {
            List<BigFiveQuestion> bigFiveQuestions = new ArrayList<>();

            String csvData = "42,\"I see myself as someone who is original, unique, and comes up with new ideas.\"\n" +
                    "43,\"I see myself as someone who is sophisticated in art, music, or literature.\"\n" +
                    "44,\"I see myself as someone who has a lot of artistic interests.\"\n" +
                    "45,\"I see myself as someone who has an active imagination.\"\n" +
                    "46,\"I see myself as someone who values artistic and creative experiences.\"\n" +
                    "47,\"I see myself as someone who is inventive.\"\n" +
                    "48,\"I see myself as someone who does a thorough job.\"\n" +
                    "49,\"I see myself as someone who is extremely careful.\"\n" +
                    "50,\"I see myself as someone who is a reliable worker.\"\n" +
                    "51,\"I see myself as someone who tends to be organized.\"\n" +
                    "52,\"I see myself as someone who tends to be diligent.\"\n" +
                    "53,\"I see myself as someone who perseveres until the task is finished.\"\n" +
                    "54,\"I see myself as someone who does things efficiently.\"\n" +
                    "55,\"I see myself as someone who prefers work that is routine.\"\n" +
                    "56,\"I see myself as someone who is cerebral and enjoys thinking deeply.\"\n" +
                    "57,\"I see myself as someone who makes plans and follows through with them.\"\n" +
                    "58,\"I see myself as someone who is not easily distracted.\"\n" +
                    "59,\"I see myself as someone who is outgoing.\"\n" +
                    "60,\"I see myself as someone who is full of energy.\"\n" +
                    "61,\"I see myself as someone who generates a lot of enthusiasm.\"\n" +
                    "62,\"I see myself as someone who tends to be loud.\"\n" +
                    "63,\"I see myself as someone who has an assertive personality.\"\n" +
                    "64,\"I see myself as someone who can be warm and friendly.\"\n" +
                    "65,\"I see myself as someone who likes to reflect and ponder different ideas.\"\n" +
                    "66,\"I see myself as someone who is outgoing and sociable.\"\n" +
                    "67,\"I see myself as someone who is talkative.\"\n" +
                    "68,\"I see myself as someone who is helpful and unselfish when it comes to others.\"\n" +
                    "69,\"I see myself as someone who avoids arguments with others.\"\n" +
                    "70,\"I see myself as someone who has a forgiving nature.\"\n" +
                    "71,\"I see myself as someone who is considerate and kind to almost everyone.\"\n" +
                    "72,\"I see myself as someone who likes to cooperate with others.\"\n" +
                    "73,\"I see myself as someone who is rarely rude to others.\"\n" +
                    "74,\"I see myself as someone who is generally trusting.\"\n" +
                    "75,\"I see myself as someone who does not look for fault in others.\"\n" +
                    "76,\"I see myself as someone who is depressed.\"\n" +
                    "77,\"I see myself as someone who can be tense.\"\n" +
                    "78,\"I see myself as someone who worries a lot.\"\n" +
                    "79,\"I see myself as someone who is emotionally stable and doesn't get upset easily.\"\n" +
                    "80,\"I see myself as someone who can be moody.\"\n" +
                    "81,\"I see myself as someone who is sometimes shy and inhibited.\"\n" +
                    "82,\"I see myself as someone who gets nervous easily.\"\n" +
                    "83,\"I see myself as someone who does not remain calm in high-pressure situations.\"\n" +
                    "84,\"I see myself as someone who does not remain calm in tense situations.\"";

            String[] lines = csvData.split("\n");

            for (String line : lines) {
                String[] parts = line.split(",");
                Long id = Long.parseLong(parts[0]);
                String question = parts[1].replaceAll("\"", "");
                BigFiveQuestion bigFiveQuestion = new BigFiveQuestion(id, question);
                bigFiveQuestions.add(bigFiveQuestion);

            }
            bigFiveQuestionRepository.saveAll(bigFiveQuestions);
        }

        //double openness, double conscientiousness, double extraversion, double agreeableness, double neuroticism, User user
        if (personalityScoreRepository.count() == 0) {
            List<PersonalityScore> userScore = Arrays.asList(
                    new PersonalityScore(1.0,2.0,3.0,4.0,5.0,userRepository.findById(1L).get()),
                    new PersonalityScore(2.0,4.0,6.0,8.0,10.0,userRepository.findById(2L).get())
            );
            personalityScoreRepository.saveAll(userScore);
        }

        if (noteRepository.count() == 0) {
            List<Note> notes = Arrays.asList(
                    new Note(userRepository.findById(1L).get(),"Hello how are you doing today"),
                    new Note(userRepository.findById(1L).get(),"im good how about you"),
                    new Note(userRepository.findById(1L).get(),"Im good too thanks")
            );
            noteRepository.saveAll(notes);
        }
    }
}