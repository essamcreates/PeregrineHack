package com.hackathon.server.components;

import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.User;
import com.hackathon.server.models.enums.MentalHealthConditionENUM;
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


    @Override
    public void run(ApplicationArguments args) throws Exception {

        MentalHealthCondition condition1 = new MentalHealthCondition(MentalHealthConditionENUM.Depression);
        MentalHealthCondition condition2 = new MentalHealthCondition(MentalHealthConditionENUM.Generalized_Anxiety_Disorder);
        MentalHealthCondition condition3 = new MentalHealthCondition(MentalHealthConditionENUM.Bipolar_Disorder);
        MentalHealthCondition condition4 = new MentalHealthCondition(MentalHealthConditionENUM.Schizophrenia);
        MentalHealthCondition condition5 = new MentalHealthCondition(MentalHealthConditionENUM.Obsessive_Compulsive_Disorder);
        MentalHealthCondition condition6 = new MentalHealthCondition(MentalHealthConditionENUM.Post_Traumatic_Stress_Disorder);
        MentalHealthCondition condition7 = new MentalHealthCondition(MentalHealthConditionENUM.Panic_Disorder);
        MentalHealthCondition condition8 = new MentalHealthCondition(MentalHealthConditionENUM.Social_Anxiety_Disorder);
        MentalHealthCondition condition9 = new MentalHealthCondition(MentalHealthConditionENUM.Attention_Deficit_Hyperactivity_Disorder);
        MentalHealthCondition condition10 = new MentalHealthCondition(MentalHealthConditionENUM.Borderline_Personality_Disorder);

        mentalHealthConditionRepository.saveAll(List.of(condition1, condition2, condition3, condition4,condition5,condition6, condition7, condition8, condition9,condition10));

        List<User> customers = Arrays.asList(
                //ADD USER HERE
                new User()

        );



        userRepository.saveAll(customers);
    }
}
