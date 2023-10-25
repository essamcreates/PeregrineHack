package com.hackathon.server.repositories;

import com.hackathon.server.models.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note,Long> {

    Note findNotesByUserId(Long id);

}
