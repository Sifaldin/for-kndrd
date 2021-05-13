package com.hikingplanner.hiking.post;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hikingplanner.hiking.comments.Comment;
import com.hikingplanner.hiking.user.User;


import java.util.List;

@Table(name = "posts")
@Entity
public class Post {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_generator")
    @SequenceGenerator(name = "post_generator", sequenceName = "post_seq")
    private Long id;

    @Column(name = "title")
    private String title;


    @Column(name = "body", length = 10000)

    private String body;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "date")
    private String date;

    @ManyToOne
    private User user;
    @ManyToMany(mappedBy = "")
    private List<User> registeredUsers;

    @Column
    private String postType;

    @Column
    private String location;

    @Column
    private String meetingTimeAndDate;

    @Column
    @ElementCollection
    private List<Double> position;

    @Column
    private Integer eventCapacity;


    private String category;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments;


    public Post(Long id, String title, String body, String postType) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.postType = postType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPostType() {
        return postType;
    }

    public void setPostType(String postType) {
        this.postType = postType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<Double> getPosition() {
        return position;
    }

    public void setPosition(List<Double> position) {
        this.position = position;
    }

    public String getMeetingTimeAndDate() {
        return meetingTimeAndDate;
    }

    public void setMeetingTimeAndDate(String meetingTime) {
        this.meetingTimeAndDate = meetingTime;
    }

    public Integer getEventCapacity() {
        return eventCapacity;
    }

    public void setEventCapacity(Integer eventCapacity) {
        this.eventCapacity = eventCapacity;
    }
    public List<User> getRegisteredUsers() {
        return registeredUsers;
    }

    public void setRegisteredUsers(List<User> registeredUsers) {
        this.registeredUsers = registeredUsers;
    }
}
