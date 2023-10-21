package com.hackathon.server.models.dtos;

import jakarta.persistence.Column;

import java.time.LocalDateTime;
import java.util.List;

public class MoodEntryDTO {

    private String mood;

    private LocalDateTime dateTime;

    private String emojiUnicode;


    public MoodEntryDTO(String mood, LocalDateTime dateTime, String emojiUnicode) {
        this.mood = mood;
        this.dateTime = dateTime;
        this.emojiUnicode = emojiUnicode;
    }

    public MoodEntryDTO() {
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getEmojiUnicode() {
        return emojiUnicode;
    }

    public void setEmojiUnicode(String emojiUnicode) {
        this.emojiUnicode = emojiUnicode;
    }
}
