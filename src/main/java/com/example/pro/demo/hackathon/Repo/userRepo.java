package com.example.pro.demo.hackathon.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pro.demo.hackathon.Entities.User;

public interface userRepo extends JpaRepository<User, Integer>{
 User findByEmail(String email);
}
