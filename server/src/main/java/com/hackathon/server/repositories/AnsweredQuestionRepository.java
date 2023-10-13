package com.hackathon.server.repositories;

import com.hackathon.server.models.AnsweredQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnsweredQuestionRepository extends JpaRepository<AnsweredQuestion,Long> {
}
