//package bitc.fullstack503.team1_server.security;
//
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureException;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.nio.charset.StandardCharsets;
//
//@Component
//public class JwtTokenProvider {
//
//  @Value("${jwt.secret}")
//  private String secretKey;
//
//  public String getUserNameFromToken(String token) {
//    Claims claims = getClaimsFromToken(token);
//    return claims.getSubject(); // JWT 토큰의 subject 필드에서 사용자 이름을 추출
//  }
//
//  private Claims getClaimsFromToken(String token) {
//    try {
//      return Jwts.parser()
//        .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)) // ← 안전하게 처리
//        .parseClaimsJws(token)
//        .getBody();
//    } catch (SignatureException e) {
//      throw new RuntimeException("Invalid JWT token");
//    }
//  }
//  public boolean validateToken(String token) {
//    try {
//      Jwts.parserBuilder()
//        .setSigningKey(Keys.hmacShaKeyFor(secretKey.getBytes()))
//        .build()
//        .parseClaimsJws(token); // 토큰을 파싱하고 서명 검증
//      return true; // 유효한 토큰
//    } catch (JwtException e) {
//      // 유효하지 않거나 만료된 토큰
//      return false;
//    }
//  }
//
//
//}
//
