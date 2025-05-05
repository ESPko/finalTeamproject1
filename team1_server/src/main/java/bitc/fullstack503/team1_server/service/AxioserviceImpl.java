package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.LoginRequest;
import bitc.fullstack503.team1_server.dto.LoginResponse;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.AxiosMapper;
import bitc.fullstack503.team1_server.security.JwtUtil;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AxioserviceImpl implements AxiosService {

    @Autowired
    private AxiosMapper axiosMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public List<UserDTO> selectEmployeeList() throws Exception {
        return axiosMapper.selectEmployeeList();
    }


    @Override
    public LoginResponse login(LoginRequest request) {
        // DB에서 사용자 정보를 가져옴 (입력한 ID로 조회)
        UserDTO user = axiosMapper.findByUsername(request.getId());
        System.out.println("DB에서 조회한 user: " + user);

        // 만약 유저가 존재한다면 디버깅용으로 비밀번호 출력
        if (user != null) {
            System.out.println("DB 패스워드: " + user.getPass());
            System.out.println("입력받은 패스워드: " + request.getPass());
        }

        //  user가 DB에 존재하는지 확인
        //  그리고 비밀번호가 DB에 저장된 값과 일치하는지 비교
        if (user != null && user.getPass().equals(request.getPass())) {
            // 로그인 성공 시 JWT 토큰을 생성
            String token = jwtUtil.generateToken(user.getId());

            // 토큰을 담아서 클라이언트에 반환 (LoginResponse)
            return new LoginResponse(token);
        }

        // 아이디가 없거나 비밀번호가 틀리면 예외 발생 (로그인 실패)
        throw new RuntimeException("Invalid credentials");
    }




}
