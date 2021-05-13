package com.hikingplanner.hiking.user;

import com.hikingplanner.hiking.comments.Comment;
import com.hikingplanner.hiking.post.Post;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="account")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column
    @OneToMany
    private List<Post> posts;

    @ManyToMany(mappedBy = "registeredUsers")
    private List<Post> events;

    @OneToMany List<Comment> comments;

    // Hibernate needs a default constructor to function
    public User() {}

    public User( String email, String password,  String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
