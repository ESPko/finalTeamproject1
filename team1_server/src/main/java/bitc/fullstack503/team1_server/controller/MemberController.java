package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
