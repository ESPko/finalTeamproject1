package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kdh.MemberMapper;
import bitc.fullstack503.team1_server.mapper.son.TransactionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    System.out.println("업데이트 할 멤버 ID : " + userDTO.getId());
    int res = memberMapper.updateMember(userDTO);
    if (res > 0) {
      // 성공적으로 업데이트된 후, userDTO를 반환 (또는 추가 조회)
      return userDTO;  // 예시: 수정 후 반환
    } else {
      throw new RuntimeException("업데이트 실패");
    }
  }
//  @Override
//  public UserDTO updateMember(UserDTO userDTO) {
//    return memberMapper.updateMember(userDTO);
//  }


//  @Override
//  public UserDTO updateMember(UserDTO userDTO) {
//    System.out.println("업데이트 하려는 사용자:  " + userDTO);
//    int res = memberMapper.updateMember(userDTO);
//    if(res > 0){
//      return userDTO;
//    }
//    else{
//      throw new RuntimeException("업데이트 실패");
//    }
//  }

  @Transactional
  @Override
  public boolean deleteMember(UserDTO userDTO) {
    System.out.println("삭제 요청한 유저 ID: " + userDTO.getId());
    System.out.println("삭제 요청한 유저 IDX: " + userDTO.getIdx());
    memberMapper.deleteTransactionsByUserId(userDTO.getId());
    return memberMapper.deleteMember(userDTO);
  }
}
