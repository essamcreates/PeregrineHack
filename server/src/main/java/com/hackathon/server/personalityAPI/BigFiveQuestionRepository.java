package com.hackathon.server.personalityAPI;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BigFiveQuestionRepository extends JpaRepository<BigFiveQuestion, Long> {
}
