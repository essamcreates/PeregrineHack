package com.hackathon.server.repositories;

import com.hackathon.server.models.DailyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyQuestionRepository extends JpaRepository<DailyQuestion,Long> {
}
