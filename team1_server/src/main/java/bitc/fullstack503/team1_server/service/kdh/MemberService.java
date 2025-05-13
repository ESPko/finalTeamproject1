package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.UserDTO;

import java.util.List;

public interface MemberService {
  List<UserDTO> getMemberList();

  UserDTO addMember(UserDTO userDTO);

  UserDTO updateMember(UserDTO userDTO);

  boolean deleteMember(UserDTO userDTO);

}
