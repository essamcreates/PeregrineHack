package com.hackathon.server.repositories;

import com.hackathon.server.models.MotivationMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MotivationMessageRepository extends JpaRepository<MotivationMessage,Long> {

    @Query("SELECT MAX(id) FROM MotivationMessage")
    Long getLastMotivationalMessageId();
}
