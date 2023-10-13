package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon.server.models.enums.AccessNeedENUM;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    // COLUMNS
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private LocalDate dateOfBirth; // COULD JUST MAKE THIS A STRING?

    @Column
    private String password;

    @Column
    private String gender;


    // RELATIONS
    /*
    TODO:
    - do the getters and setters for these
    - update the constructor too if needed

    - accessNeeds
    - careerGoals
    - mood
     */


//    @ElementCollection(targetClass = AccessNeed.class,fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_access_needs",joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    @Column(name = "access_needs")
//    private List<AccessNeed> accessNeeds;

    @ManyToMany
    @JoinTable(
            name = "users_access_needs",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "access_need_id")
    )
    private List<AccessNeed> accessNeeds;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    @Column(name = "answered_questions")
    private List<AnsweredQuestion> answeredQuestions;

    @ManyToMany
    @JoinTable(
            name = "users_goals",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "goal_id")
    )
    private List<Goal> careerGoals;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    @Column(name = "mood_entries")
    private List<MoodEntry> moodEntries;

    @OneToOne(mappedBy = "user")
    @JoinColumn(name = "big_five_trait_id")
    private BigFiveTrait bigFiveTrait;

    @ManyToMany
    @JoinTable(
            name = "users_mental_health_conditions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "mental_health_condition_id")
    )
    private List<MentalHealthCondition> mentalHealthConditions;

//    @ElementCollection(targetClass = MentalHealthCondition.class,fetch = FetchType.EAGER)
//    @CollectionTable(name = "user_mental_health_conditions",joinColumns = @JoinColumn(name = "user_id"))
//    @Enumerated(EnumType.STRING)
//    @Column(name = "mental_health_conditions")
//    private List<MentalHealthCondition> mentalHealthConditions;



    public User() {
    }

    public User(String name, LocalDate dateOfBirth, String password, String gender) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

}
