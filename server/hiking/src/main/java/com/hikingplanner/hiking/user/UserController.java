package com.hikingplanner.hiking.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class UserController {

    @Autowired
    UserService userService;


    @PutMapping("/user/me")
    public User update(@RequestBody User updatedUser) {
        return userService.update(updatedUser);
    }

}
