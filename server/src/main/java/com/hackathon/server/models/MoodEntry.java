package com.hackathon.server.models;

import java.time.LocalDateTime;

public class MoodEntry {
    private Long id;

    private String mood;

    private LocalDateTime dateTime;
    private String emojiUnicode;

    public MoodEntry() {
    }

    public MoodEntry(Long id, String mood, LocalDateTime dateTime, String emojiUnicode) {
        this.id = id;
        this.mood = mood;
        this.dateTime = dateTime;
        this.emojiUnicode = emojiUnicode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
