package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.LoginRequest;
import bitc.fullstack503.team1_server.dto.LoginResponse;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.security.JwtUtil;
import bitc.fullstack503.team1_server.service.AxiosService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AxiosTestController {

    @Autowired
    private AxiosService axiosService;

    @GetMapping({"", "/"})
    public Object index() {
        return "Board API Server 접속";
    }

    // 파라미터가 없는 GET 방식 통신 (전체 검색)
    @GetMapping("/user")
    public Object selectEmployeeList() throws Exception {

        List<UserDTO> employeeList = axiosService.selectEmployeeList();

        return employeeList;
    }

    @PostMapping("api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = axiosService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
