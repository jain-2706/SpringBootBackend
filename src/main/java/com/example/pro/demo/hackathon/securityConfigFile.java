package com.example.pro.demo.hackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.pro.demo.hackathon.Filter.jwtFilter;
import com.example.pro.demo.hackathon.Service.MyService;



@Configuration
@EnableWebSecurity
public class securityConfigFile {
   @Autowired
   private jwtFilter jft; 
    @Bean
    public SecurityFilterChain secClass(HttpSecurity http) throws Exception
    {
         http
         .csrf(csrfCustomizer->csrfCustomizer.disable())
         .authorizeHttpRequests(request->request.requestMatchers("/loginUser","/addUser","/process").permitAll()
         .anyRequest().authenticated()
        )

         .httpBasic(org.springframework.security.config.Customizer.withDefaults())
         .addFilterBefore(jft, UsernamePasswordAuthenticationFilter.class);
         //To allow only authorized Users
         //http.authorizedHttpRequests(request->request.anyRequest().authenticated())
         return http.build();
    }
     @Bean
    public AuthenticationProvider auth(MyService ms)
    {
        DaoAuthenticationProvider dao=new DaoAuthenticationProvider(ms);
        dao.setPasswordEncoder(psc());
        return dao;
    }
    @Bean
    public PasswordEncoder psc()
    {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration ac)
    {
       return ac.getAuthenticationManager();
    }
}
