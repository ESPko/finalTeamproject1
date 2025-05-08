package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {

  @Autowired
  private MemberService memberService;

  @GetMapping("/member")
  public List<UserDTO> getMemberList(){
    return memberService.getMemberList();
  }

  @PostMapping("/addMember")
  public UserDTO addMember(@RequestBody UserDTO userDTO){
    memberService.addMember(userDTO);
    return userDTO;
  }

  @PutMapping("/updateMember")
  public UserDTO updateMember(@RequestBody UserDTO userDTO){

    return memberService.updateMember(userDTO);
  }

  @DeleteMapping("/deleteMember")
  public UserDTO deleteMember(@RequestBody UserDTO userDTO){
    boolean result = memberService.deleteMember(userDTO);

    UserDTO response = new UserDTO();

    if(result){
      response.setId(userDTO.getId());
      System.out.println("직원 삭제 완료");
    }
    else{
      response.setId(userDTO.getId());
      System.out.println("직원 삭제 실패");
    }
    return response;
  }
}
