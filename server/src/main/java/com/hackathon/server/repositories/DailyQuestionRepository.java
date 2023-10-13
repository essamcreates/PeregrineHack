package com.hackathon.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyQuestionRepository extends JpaRepository<DailyQuestionRepository,Long> {
}
