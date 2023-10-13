package com.hackathon.server.repositories;

import com.hackathon.server.models.PersonalityScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalityScoreRepository extends JpaRepository<PersonalityScore, Long> {
}
