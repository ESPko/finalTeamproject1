package bitc.fullstack503.team1_server.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // 비밀키: 최소 64바이트 이상으로 설정 (HS512 알고리즘은 강한 키가 필요)
    // 이 키는 토큰 생성과 검증에 사용됨
    private final String secret = "my-very-long-secret-key-that-is-at-least-64-bytes-long-1234567890-ABCDEFG";

    // 토큰 만료 시간: 현재 1시간(3600000ms)으로 설정
    private final long expiration = 3600000L; // 1시간

    // JWT 토큰 생성 메서드
    public String generateToken(String username) {
        return Jwts.builder()
                // 토큰의 주제(보통 사용자명 등 고유 정보)
                .setSubject(username)
                // 토큰 발급 시간 (현재 시각)
                .setIssuedAt(new Date())
                // 토큰 만료 시간 (현재 시각 + 만료시간 설정)
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                // 서명: 지정한 비밀키와 HS512 알고리즘으로 서명함
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512)
                // 최종 토큰 문자열로 만듦
                .compact();
    }

    // JWT 토큰 검증 메서드 (유효한지 체크)
    public boolean validateToken(String token) {
        try {
            // 파서 생성: 비밀키를 사용해서 토큰을 해석함
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    // 토큰의 유효성을 체크 (서명 및 만료 등)
                    .parseClaimsJws(token);
            // 예외 없으면 유효한 토큰
            return true;
        } catch (JwtException e) {
            // 파싱 실패나 유효하지 않으면 false 반환
            return false;
        }
    }
}


