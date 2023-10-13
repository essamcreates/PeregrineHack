package com.hackathon.server.repositories;

import com.hackathon.server.models.MentalHealthCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentalHealthConditionRepository extends JpaRepository<MentalHealthCondition,Long> {
}
