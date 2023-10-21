package com.hackathon.server.services;

import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.MoodEntry;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.models.dtos.UserMentalHealthConditionDTO;
import com.hackathon.server.repositories.MoodEntryRepository;
import com.hackathon.server.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MoodEntryService {

    @Autowired
    MoodEntryRepository moodEntryRepository;

    @Autowired
    UserRepository userRepository;

    public List<MoodEntry> getAllMoodEntries() {
        return moodEntryRepository.findAll();
    }

    public Optional<List<MoodEntry>> getMoodEntryByDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);  // Assumes a day ends at 23:59:59
        List<MoodEntry> moodEntries = moodEntryRepository.findAllByDateTimeBetween(startOfDay, endOfDay);
        if(!moodEntries.isEmpty()){
            return Optional.of(moodEntries);
        }else{
            return Optional.empty();
        }
    }

    public Optional<List<MoodEntry>> getMoodEntriesByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        List<MoodEntry> entries = user.getMoodEntries();
        if(!entries.isEmpty()){
            return Optional.of(entries);
        }else{
            return Optional.empty();
        }
    }

    public void saveUserMoodEntry(MoodEntryDTO moodEntryDTO, Long userId){
        User user = userRepository.findById(userId).get();
        MoodEntry newMoodEntry = new MoodEntry(
                moodEntryDTO.getMood(),moodEntryDTO.getDateTime(), moodEntryDTO.getEmojiUnicode(), user);
        moodEntryRepository.save(newMoodEntry);
    }
}

