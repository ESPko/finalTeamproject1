package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.MemberMapper;
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
}
