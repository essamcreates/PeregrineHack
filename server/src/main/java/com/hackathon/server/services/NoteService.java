package com.hackathon.server.services;

import com.hackathon.server.models.MoodEntry;
import com.hackathon.server.models.Note;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.NoteDTO;
import com.hackathon.server.repositories.NoteRepository;
import com.hackathon.server.repositories.UserRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {
    @Autowired
    NoteRepository noteRepository;

    @Autowired
    UserRepository userRepository;


    public Optional<List<Note>> getMoodNoteByUser(Long userId) {
        User user = userRepository.findById(userId).get();
        List<Note> entries = user.getNotes();
        if(!entries.isEmpty()){
            return Optional.of(entries);
        }else{
            return Optional.empty();
        }
    }

    public void saveUserNote(NoteDTO noteDTO, Long id) {
        User user = userRepository.findById(id).get();
        Note note = new Note(user,noteDTO.getNote());
        noteRepository.save(note);
    }
}
