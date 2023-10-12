package com.hackathon.server.components;

import com.hackathon.server.models.User;
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


    @Override
    public void run(ApplicationArguments args) throws Exception {

        List<User> customers = Arrays.asList(
                //ADD USER HERE
                new User()

        );



        userRepository.saveAll(customers);
    }
}
