package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kdh.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

  @Autowired
  private MemberMapper memberMapper;

  @Override
  public List<UserDTO> getMemberList() {
    return memberMapper.getMemberList();
  }

  @Override
  public UserDTO addMember(UserDTO userDTO) {
    memberMapper.addMember(userDTO);
    return userDTO;
  }

  @Override
  public UserDTO updateMember(UserDTO userDTO) {
    return memberMapper.updateMember(userDTO);
  }

  @Override
  public boolean deleteMember(UserDTO userDTO) {
    return memberMapper.deleteMember(userDTO);
  }
}
