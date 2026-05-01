package com.example.pro.demo.hackathon.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.pro.demo.hackathon.Entities.User;
import com.example.pro.demo.hackathon.Repo.userRepo;
import com.example.pro.demo.hackathon.Service.FunctionService;

@CrossOrigin(origins = "*")

@RestController
public class firstController {
     @Autowired
    private FunctionService sc;
    @Autowired
    private PasswordEncoder ps;
    @Autowired
    private userRepo urepo;
    @GetMapping("/data")
    public String GettingData()
    {
        return "Getting";
    }

    @PostMapping("/addUser")
    public User postMethodName(@RequestBody User u) {
        u.setPassword(ps.encode(u.getPassword()));
        urepo.save(u);
        return u;
    }
    
    @PostMapping("/loginUser")
    public String checkUser(@RequestBody User u) {
        return sc.verify(u);
    }
    @PostMapping("/process")
public Object process(@RequestBody Map<String, Object> request) {
    return sc.callFastApi(request);
}
}
