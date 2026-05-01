package com.example.pro.demo.hackathon.Service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.example.pro.demo.hackathon.Entities.User;
import com.example.pro.demo.hackathon.UtilityClass.JwtUtil;

@Component
public class FunctionService {

   @Autowired
   private JwtUtil jwt;
    @Autowired
    private AuthenticationManager authmanager;
       public String verify(User u)
    {
       Authentication auth=authmanager.authenticate(new UsernamePasswordAuthenticationToken(u.getEmail(), u.getPassword()) );
       System.out.println("🔥 After Authentication");

       if(auth.isAuthenticated())
       {
        return jwt.generateToken(u.getEmail());
       }
       else
       {
        return "Login Failed";
       }
    }

  
    public Object callFastApi(Map<String, Object> request) {

        // Handle Render cold start delay
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(60000);
        factory.setReadTimeout(60000);

        RestTemplate restTemplate = new RestTemplate(factory);

        String url = "https://smart-meeting-ai.onrender.com/process";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<Object> response =
                restTemplate.postForEntity(url, entity, Object.class);

        return response.getBody();
    }
}

