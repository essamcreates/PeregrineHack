package com.hackathon.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "motivation_message")
public class MotivationMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String message;

    public MotivationMessage() {
    }

    public MotivationMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
