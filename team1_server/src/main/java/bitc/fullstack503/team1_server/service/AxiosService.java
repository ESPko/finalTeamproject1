package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.LoginRequest;
import bitc.fullstack503.team1_server.dto.LoginResponse;
import bitc.fullstack503.team1_server.dto.UserDTO;

import java.util.List;

public interface AxiosService {
    List<UserDTO> selectEmployeeList() throws Exception;


    LoginResponse login(LoginRequest request);
}
