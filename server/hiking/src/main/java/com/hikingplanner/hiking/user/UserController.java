package com.hikingplanner.hiking.user;

import com.hikingplanner.hiking.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @GetMapping("/user")
    public User findUserByEmail() {
        String email = authService.getLoggedInUserEmail();
        return userService.findUserByEmail(email);
    }

    @PutMapping("/user")
    public User update(@RequestBody User updatedUser) {
        return userService.update(updatedUser);
    }

}
