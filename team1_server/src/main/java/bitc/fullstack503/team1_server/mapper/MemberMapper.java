package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
  List<UserDTO> getMemberList();

  void addMember(UserDTO userDTO);
}
