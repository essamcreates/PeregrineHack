package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon.server.models.enums.MentalHealthConditionENUM;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "mental_health_conditions")
public class MentalHealthCondition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "mental_health_condition")
    private MentalHealthConditionENUM mentalHealthConditionENUM;

    @ManyToMany(mappedBy = "mentalHealthConditions")
    @JsonIgnoreProperties({"mentalHealthConditions"})
    private List<User> users;

    public MentalHealthCondition() {
    }

    public MentalHealthCondition(MentalHealthConditionENUM mentalHealthConditionENUM) {
        this.mentalHealthConditionENUM = mentalHealthConditionENUM;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MentalHealthConditionENUM getMentalHealthCondition() {
        return mentalHealthConditionENUM;
    }

    public void setMentalHealthCondition(MentalHealthConditionENUM mentalHealthConditionENUM) {
        this.mentalHealthConditionENUM = mentalHealthConditionENUM;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
