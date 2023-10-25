package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String jobTitle;

    @Column
    private String email;

    @Column
    private LocalDate dateOfBirth;

    @Column
    private String password;

    @Column
    private String gender;

    @Column
    private String profilePictureURL;



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

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    @Column(name = "notes")
    private List<Note> notes;

//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
//    @JoinColumn(name = "personality_score_id")
//    private PersonalityScore personalityScore;

    @ManyToMany
    @JoinTable(
            name = "users_mental_health_conditions",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "mental_health_condition_id")
    )
    private List<MentalHealthCondition> mentalHealthConditions;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties({"user"})
    @Column(name = "user_responses")
    private List<UserResponse> userResponses;

    public User() {
    }

    public User(String name, String jobTitle, LocalDate dateOfBirth, String password, String gender, String email, String profilePictureURL) {
        this.name = name;
        this.jobTitle = jobTitle;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.gender = gender;
        this.email = email;
        this.profilePictureURL = profilePictureURL;
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


    public List<AccessNeed> getAccessNeeds() {
        return accessNeeds;
    }

    public void setAccessNeeds(List<AccessNeed> accessNeeds) {
        this.accessNeeds = accessNeeds;
    }

    public List<AnsweredQuestion> getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(List<AnsweredQuestion> answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public List<Goal> getCareerGoals() {
        return careerGoals;
    }

    public void setCareerGoals(List<Goal> careerGoals) {
        this.careerGoals = careerGoals;
    }

    public List<MoodEntry> getMoodEntries() {
        return moodEntries;
    }

    public void setMoodEntries(List<MoodEntry> moodEntries) {
        this.moodEntries = moodEntries;
    }

//    public PersonalityScore getPersonalityScore() {
//        return personalityScore;
//    }
//
//    public void setPersonalityScore(PersonalityScore personalityScore) {
//        this.personalityScore = personalityScore;
//    }

    public List<MentalHealthCondition> getMentalHealthConditions() {
        return mentalHealthConditions;
    }

    public void setMentalHealthConditions(List<MentalHealthCondition> mentalHealthConditions) {
        this.mentalHealthConditions = mentalHealthConditions;
    }

    public void addGoal(Goal goal){
        this.careerGoals.add(goal);
    }

    public void addMentalHealthCondition(MentalHealthCondition mentalHealthCondition) {
        this.mentalHealthConditions.add(mentalHealthCondition);
    }
    public void addAccessNeed(AccessNeed accessNeed){
        this.accessNeeds.add(accessNeed);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<UserResponse> getUserResponses() {
        return userResponses;
    }

    public void setUserResponses(List<UserResponse> userResponses) {
        this.userResponses = userResponses;
    }

    public String getProfilePictureURL() {
        return profilePictureURL;
    }

    public void setProfilePictureURL(String profilePictureURL) {
        this.profilePictureURL = profilePictureURL;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
