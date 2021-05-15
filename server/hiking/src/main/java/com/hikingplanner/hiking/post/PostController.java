package com.hikingplanner.hiking.post;

import com.hikingplanner.hiking.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService service;
    private final AuthService authService;

    @Autowired
    public PostController(PostService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    /**
     * EndPoint that receives a request to get all the posts.
     * @return Invoke the getAll function in the postService class.
     * List of all posts
     */
    @GetMapping("")
    public List<Post> getAll() {
        return service.getAll();
    }

    /**
     * EndPoint that receives a specific id and send it to the post service.
     * @param id
     * @return Invoke the getById function in the postService class.
     * The post with specific id.
     */
    @GetMapping("/{id}")
    public Post getById(@PathVariable Long id) {
        return service.getById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
    
    /**
     * EndPoint that receives new post data and send them to the post service to create the new post
     * @param newPost
     * @return Invoke the create function in the postService class.
     * The new post.
     */
    @PostMapping("")
    public Post create(@RequestBody Post newPost) {
        return service.create(newPost);
    }

    /**
     * EndPoint that receives the updated data and send them to the post service to update an existed post.
     * @param updatedPost
     * @return Invoke the update function in the postService class.
     * The updated post
     */
    @PutMapping("")
    public Post update(@RequestBody Post updatedPost) {
        return service.update(updatedPost);
    }

    /**
     * EndPoint that receives a specific id and invoke the delete function in post service.
     * @param id
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
