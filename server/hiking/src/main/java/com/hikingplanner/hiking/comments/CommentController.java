package com.hikingplanner.hiking.comments;


import com.hikingplanner.hiking.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService service;
    PostRepository postRepository;


    @Autowired
    public CommentController(CommentService service) {
        this.service = service;
    }


    /**
     * EndPoint that receives a request to get all the comments
     *
     * @return Invoke the getAll function in the commentService class.
     *List of comments.
     */
    @GetMapping("")
    public List<Comment> getComments() {
        return service.getAll();
    }


    /**
     * EndPoint that receives new comment data and send them to the comment service to create the new comment
     * @param newComment
     * @return Invoke the create function in the commentService class.
     * List of comments
     */
    @PostMapping("")
    public Comment create(@RequestBody Comment newComment) {
        return service.create(newComment);
    }


    /**
     * EndPoint that receives the updated data and send them to the comment service to update an existed comment.
     * @param updatedComment
     * @return Invoke the update function in the postService class.
     * The updated comment.
     */
    @PutMapping("")
    public Comment update(@RequestBody Comment updatedComment) {
        return service.update(updatedComment);
    }

    /**
     * EndPoint that receives a specific id and invoke the delete function in comment service.
     * @param id
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}