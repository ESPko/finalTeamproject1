package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.EmployeeDTO;

import java.util.List;

public interface AxiosService {
    List<EmployeeDTO> selectEmployeeList() throws Exception;
}
