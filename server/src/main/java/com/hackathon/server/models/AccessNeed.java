package com.hackathon.server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hackathon.server.models.enums.AccessNeedENUM;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "access_needs")
public class AccessNeed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_need")
    private AccessNeedENUM accessNeedENUM;

    @ManyToMany(mappedBy = "accessNeeds")
    @JsonIgnoreProperties({"accessNeeds"})
    private List<User> users;

    public AccessNeed(AccessNeedENUM accessNeedENUM) {
        this.accessNeedENUM = accessNeedENUM;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccessNeedENUM getAccessNeedENUM() {
        return accessNeedENUM;
    }

    public void setAccessNeedENUM(AccessNeedENUM accessNeedENUM) {
        this.accessNeedENUM = accessNeedENUM;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
