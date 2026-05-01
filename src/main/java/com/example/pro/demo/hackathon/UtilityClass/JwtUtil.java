package com.example.pro.demo.hackathon.UtilityClass;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtil {
     private String secretKey;


    public JwtUtil() 
    {
        
        try {
            KeyGenerator kg=KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk =kg.generateKey();
            secretKey=Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException ex) {
            System.getLogger(JwtUtil.class.getName()).log(System.Logger.Level.ERROR, (String) null, ex);
        }
        
    }
    
    public String generateToken(String username)
    {
        Map<String,Object>cla=new HashMap<>();
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .claims(cla)
                .expiration(new Date(System.currentTimeMillis()+(240*100*100)))
                .signWith(getKey())
                .compact();
    }
    private SecretKey getKey()
    {
        byte[] sec=Decoders.BASE64.decode(secretKey);
       return Keys.hmacShaKeyFor(sec);
    } 
    

       public String extractUserName(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
