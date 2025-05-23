package bitc.fullstack503.team1_server.service;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.AxiosMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AxioserviceImpl implements AxiosService
{
  @Autowired
  private AxiosMapper axiosMapper;

  @Override
  public List<UserDTO> selectEmployeeList () throws Exception
  {
    return axiosMapper.selectEmployeeList ();
  }
}
