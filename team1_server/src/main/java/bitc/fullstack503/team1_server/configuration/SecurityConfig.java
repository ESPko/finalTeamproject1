package bitc.fullstack503.team1_server.configuration;

import bitc.fullstack503.team1_server.security.JwtAuthenticationFilter;
import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .cors(Customizer.withDefaults())  // CORS 허용 설정
          .csrf(AbstractHttpConfigurer::disable) // CSRF 비활성화 (JWT 인증 시스템에서는 일반적)
          .sessionManagement(session -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 상태를 사용하지 않음
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
          )
          .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // JWT 필터 추가

        return http.build();
    }

    // 🔥 CORS 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 와일드카드 패턴으로 다양한 로컬 주소 및 포트 허용
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",           // React 개발 서버
                "http://localhost:5174",           // React 개발 서버
                "http://127.0.0.1:5173",           // 다른 로컬 접근
                "http://10.0.2.2:5173",            // Android Emulator 접근 시
                "http://10.100.203.16:5173",       // 실기기 접근
                "http://3.39.53.78:5173",
                "http://3.39.53.78:5174",
                "http://3.39.53.78:8080",
                "https://espko.github.io"
                // 배포 서버
// 배포 서버
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // JWT 사용 시 필요

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
