package com.hackathon.server.components;

import com.hackathon.server.models.AccessNeed;
import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.User;
import com.hackathon.server.models.enums.AccessNeedENUM;
import com.hackathon.server.models.enums.MentalHealthConditionENUM;
import com.hackathon.server.repositories.AccessNeedRepository;
import com.hackathon.server.repositories.MentalHealthConditionRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

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


        List<User> customers = Arrays.asList(
                //ADD USER HERE
                new User()

        );
        userRepository.saveAll(customers);
    }
}
