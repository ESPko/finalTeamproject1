package bitc.fullstack503.team1_server.mapper.kms;

import bitc.fullstack503.team1_server.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {
    UserDTO findByUsername(@Param("id") String id);
}
