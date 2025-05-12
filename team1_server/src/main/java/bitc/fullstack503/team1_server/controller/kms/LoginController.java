package bitc.fullstack503.team1_server.controller.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.service.kms.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {

            LoginResponse response = loginService.login(request);

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
