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
            return new LoginResponse(token, user);
        }

        throw new RuntimeException("Invalid credentials");
    }

}
