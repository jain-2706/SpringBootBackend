package com.example.pro.demo.hackathon.extending;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.pro.demo.hackathon.Entities.User;

public class extendingUserDetails implements UserDetails {
   final private User use;
    public extendingUserDetails(User u)
    {
       this.use=u;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return java.util.Collections.emptyList();
    }

    @Override
    public String getPassword() {
       return use.getPassword();

    }

    @Override
    public String getUsername() {
        return use.getEmail();
    }

}
