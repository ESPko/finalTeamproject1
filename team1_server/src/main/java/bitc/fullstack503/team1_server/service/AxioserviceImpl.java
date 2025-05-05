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
        UserDTO user = axiosMapper.findByUsername(request.getId());
        System.out.println("DB에서 조회한 user: " + user);
        if (user != null) {
            System.out.println("DB 패스워드: " + user.getPass());
            System.out.println("입력받은 패스워드: " + request.getPass());
        }

        if (user != null && user.getPass().equals(request.getPass())) {
            String token = jwtUtil.generateToken(user.getId());
            return new LoginResponse(token);
        }
        throw new RuntimeException("Invalid credentials");
    }



}
