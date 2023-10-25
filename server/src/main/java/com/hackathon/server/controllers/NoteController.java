package com.hackathon.server.controllers;

import com.hackathon.server.models.MoodEntry;
import com.hackathon.server.models.Note;
import com.hackathon.server.models.dtos.MoodEntryDTO;
import com.hackathon.server.models.dtos.NoteDTO;
import com.hackathon.server.services.NoteService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("notes")
public class NoteController {
    @Autowired
    NoteService noteService;

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Optional<List<Note>>> getMoodEntriesByUser(@PathVariable Long userId){
        Optional<List<Note>> userNotes= noteService.getMoodNoteByUser(userId);
        if(userNotes.isPresent()){
            return new ResponseEntity<>(userNotes, HttpStatus.FOUND);
        }else {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/user/{userId}")
    public void addNote(@RequestBody NoteDTO noteDTO, @PathVariable Long userId){
        noteService.saveUserNote(noteDTO, userId);
    }


}
