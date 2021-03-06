package com.hikingplanner.hiking.post;

import com.hikingplanner.hiking.comments.Comment;
import com.hikingplanner.hiking.user.User;

import javax.persistence.*;
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

    @Column
    private String meetingTimeAndDate;


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments;

    public Post() {
    }

    public Post(Long id, String title, String body, String postType) {
        this.id = id;
        this.title = title;
        this.body = body;
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

    public String getMeetingTimeAndDate() {
        return meetingTimeAndDate;
    }

    public void setMeetingTimeAndDate(String meetingTime) {
        this.meetingTimeAndDate = meetingTime;
    }

}
