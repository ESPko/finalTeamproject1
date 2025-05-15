package bitc.fullstack503.team1_server.controller.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.dto.Login.RefreshTokenDTO;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kms.LoginMapper;
import bitc.fullstack503.team1_server.mapper.kms.RefreshTokenMapper;
import bitc.fullstack503.team1_server.security.JwtUtil;
import bitc.fullstack503.team1_server.service.kms.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenMapper refreshTokenMapper;

    @GetMapping({"", "/"})
    public Object index() {
        return "Test API Server 접속";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {

            LoginResponse response = loginService.login(request);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }

        RefreshTokenDTO tokenDTO = refreshTokenMapper.findByToken(refreshToken);
        if (tokenDTO == null || tokenDTO.getExpiryDate().before(new Date())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired or not found");
        }

        UserDTO user = loginService.getUserById(jwtUtil.extractUsername(refreshToken));
        String newAccessToken = jwtUtil.generateAccessToken(user.getId());

        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }





}
