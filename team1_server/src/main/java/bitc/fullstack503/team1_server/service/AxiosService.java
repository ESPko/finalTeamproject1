package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.UserDTO;

import java.util.List;

public interface AxiosService {
    List<UserDTO> selectEmployeeList() throws Exception;
}
