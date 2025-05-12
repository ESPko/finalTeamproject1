package bitc.fullstack503.team1_server.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    // 안전한 키를 생성하려면 64바이트 이상의 문자열을 사용
    // 이 키는 64바이트 이상이어야 합니다. 예: "my-very-long-secret-key-that-is-at-least-64-bytes-long-1234567890-ABCDEFG"
    private final String secret = "my-very-long-secret-key-that-is-at-least-64-bytes-long-1234567890-ABCDEFG";

    private final long expiration = 36000000L; // 1시간

    // 토큰 생성
    public String generateToken(String username) {
        return Jwts.builder()
          .setSubject(username)
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + expiration))
          .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512) // Secret key 64바이트 사용
          .compact();
    }

    // 토큰 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
              .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())) // Secret key 64바이트 사용
              .build()
              .parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
