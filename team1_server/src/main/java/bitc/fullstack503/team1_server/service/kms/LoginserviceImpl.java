package bitc.fullstack503.team1_server.service.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kms.LoginMapper;
import bitc.fullstack503.team1_server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginserviceImpl implements LoginService {

    @Autowired
    private LoginMapper loginMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest request) {
        UserDTO user = loginMapper.findByUsername(request.getId());
        System.out.println("DB에서 조회한 user: " + user);

        if (user != null) {
            System.out.println("DB 패스워드: " + user.getPass());
            System.out.println("입력받은 패스워드: " + request.getPass());
        }

        if (user != null && user.getPass().equals(request.getPass())) {
            String token = jwtUtil.generateToken(user.getId());

            // 로그인 성공 시, 생성된 로그인 응답을 로그로 출력
            LoginResponse loginResponse = new LoginResponse(token, user);
            System.out.println("LoginResponse 생성됨: " + loginResponse);

            return loginResponse;
        }

        throw new RuntimeException("Invalid credentials");
    }

//    직원 관리 페이지 부장만 접근 가능하게 하기 위한 부분
//    승인 목록 페이지 부장만 승인, 거절 버튼 눌러 값 변경 할 수 있게 하기 위한 부분
    @Override
    public UserDTO getUserById(String id) {
        return loginMapper.findByUsername(id);
    }


}
