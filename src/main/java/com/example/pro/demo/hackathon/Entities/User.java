package com.example.pro.demo.hackathon.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users") 
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;
  private String email;
  private String password;
    private String username;
  public String getUsername() {
    return username;
}

  public void setUsername(String username) {
    this.username = username;
  }
    public User() {
    }

    public void setId(int id) {
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
   @Override
public String toString() {
    return "User [id=" + id + ", email=" + email + ", password=" + password + "]";
}
}
