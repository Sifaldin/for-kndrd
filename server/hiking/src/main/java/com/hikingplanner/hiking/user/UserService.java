package com.hikingplanner.hiking.user;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


@Service()
public class UserService {
    @Autowired
    private UserRepository userRepository;


    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void register(User user) {

        userRepository.save(user);
    }

    public User update(User updatedUser) {
        return userRepository.save(updatedUser);
    }
}
