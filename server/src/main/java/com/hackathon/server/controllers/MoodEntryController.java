package com.hackathon.server.controllers;

import com.hackathon.server.models.MoodEntry;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.services.MoodEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("moodEntries")
public class MoodEntryController {

    @Autowired
    MoodEntryService moodEntryService;

    @GetMapping
    public ResponseEntity<List<MoodEntry>> getAllMoodEntries(){
        return new ResponseEntity<>(moodEntryService.getAllMoodEntries(), HttpStatus.OK);
    }

    @GetMapping(value = "/{date}")
    public ResponseEntity<Optional<List<MoodEntry>>> getMoodEntryByDate(@PathVariable LocalDate date){
        Optional<List<MoodEntry>> moodEntriesOnDay= moodEntryService.getMoodEntryByDate(date);
        if(moodEntriesOnDay.isPresent()){
            return new ResponseEntity<>(moodEntriesOnDay, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }

    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Optional<List<MoodEntry>>> getMoodEntriesByUser(@PathVariable Long userId){
        Optional<List<MoodEntry>> userMoodEntries= moodEntryService.getMoodEntriesByUser(userId);
        if(userMoodEntries.isPresent()){
            return new ResponseEntity<>(userMoodEntries, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping(value = "/{userId}")
    public void createUserMoodEntry(@RequestBody MoodEntryDTO moodEntryDTO, @PathVariable Long userId){
        moodEntryService.saveUserMoodEntry(moodEntryDTO, userId);
    }
}
