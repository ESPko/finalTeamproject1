package bitc.fullstack503.team1_server.service.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.dto.UserDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface LoginService {
    LoginResponse login(LoginRequest request, HttpServletRequest httpRequest);

//    직원 관리 페이지 부장만 접근 가능하게 하기 위한 부분
//    승인 목록 페이지 부장만 승인, 거절 버튼 눌러 값 변경 할 수 있게 하기 위한 부분
    UserDTO getUserById(String id);

}
