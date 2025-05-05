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
            // 서비스 계층(axiosService)의 login 메서드를 호출해서 로그인 시도
            LoginResponse response = axiosService.login(request);

            // 로그인 성공: HTTP 200 OK 응답으로 JWT 토큰을 클라이언트에 반환
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // 로그인 실패: 예외 발생 시 HTTP 401 Unauthorized 응답 반환
            // 예외 메시지를 함께 보내서 클라이언트가 실패 이유를 알 수 있게 함
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
