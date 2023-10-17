package com.hackathon.server.sentinoAPI;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SentinoRepository extends JpaRepository<BigFiveQuestion, Long> {
}
