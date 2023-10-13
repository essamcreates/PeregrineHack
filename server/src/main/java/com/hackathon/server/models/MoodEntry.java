package com.hackathon.server.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "mood_entry")
public class MoodEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String mood;

    @Column
    private LocalDateTime dateTime;

    @Column
    private String emojiUnicode;

    public MoodEntry() {
    }

    public MoodEntry(String mood, LocalDateTime dateTime, String emojiUnicode) {
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
