package com.example.pro.demo.hackathon.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.pro.demo.hackathon.Entities.User;
import com.example.pro.demo.hackathon.Repo.userRepo;
import com.example.pro.demo.hackathon.extending.extendingUserDetails;

@Service
public class MyService implements UserDetailsService {
      @Autowired
    private userRepo urepo;
  
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
   
        User s=urepo.findByEmail(email);

        if(s==null)
        {
            System.out.println("User not found in DB");
             throw new  UsernameNotFoundException("User don't exist"); 
        }
              System.out.println("User: " + s.getEmail());
              System.out.println("Pass from DB: " + s.getPassword());
        return new extendingUserDetails(s);
    }
}
