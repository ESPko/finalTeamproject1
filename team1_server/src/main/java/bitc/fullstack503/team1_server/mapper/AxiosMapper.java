package bitc.fullstack503.team1_server.mapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface AxiosMapper
{
  List<EmployeeDTO> selectEmployeeList () throws Exception;
}
