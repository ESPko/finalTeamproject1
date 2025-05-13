package bitc.fullstack503.team1_server.controller;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.service.AxiosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class AxiosTestController
{
  @Autowired
  private AxiosService axiosService;
  
  @GetMapping ({"", "/"})
  public Object index ()
  {
    return "Board API Server 접속";
  }
  
  // 파라미터가 없는 GET 방식 통신 (전체 검색)
  @GetMapping ("/employee")
  public Object selectEmployeeList () throws Exception
  {
    List<UserDTO> employeeList = axiosService.selectEmployeeList ();
    return employeeList;
  }
}
