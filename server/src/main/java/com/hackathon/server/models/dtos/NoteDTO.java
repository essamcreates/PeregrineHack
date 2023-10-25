package com.hackathon.server.models.dtos;

public class NoteDTO {

    private String note;

    public NoteDTO() {
    }

    public NoteDTO(String note) {
        this.note = note;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
