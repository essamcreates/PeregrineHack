package com.hackathon.server.repositories;

import com.hackathon.server.models.AccessNeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessNeedRepository extends JpaRepository<AccessNeed,Long> {
}
