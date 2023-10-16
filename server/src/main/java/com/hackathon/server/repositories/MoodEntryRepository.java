package com.hackathon.server.repositories;

import com.hackathon.server.models.MoodEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MoodEntryRepository extends JpaRepository<MoodEntry,Long> {
    List<MoodEntry> findAllByDateTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}
