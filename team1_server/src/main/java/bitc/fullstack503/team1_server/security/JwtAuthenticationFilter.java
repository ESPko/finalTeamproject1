package bitc.fullstack503.team1_server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        System.out.println("[필터 작동] 요청 URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            System.out.println("[필터 작동] JWT 토큰 감지됨");

            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                System.out.println("[필터 작동] 토큰 유효 - 사용자: " + username);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                System.out.println("[필터 작동] 유효하지 않은 토큰");
            }
        } else {
            System.out.println("[필터 작동] Authorization 헤더 없음");
        }

        filterChain.doFilter(request, response);
    }

}