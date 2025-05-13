package bitc.fullstack503.team1_server.controller.kdh;

import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.security.JwtUtil;
import bitc.fullstack503.team1_server.service.kdh.MemberService;
import bitc.fullstack503.team1_server.service.kms.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {

  @Autowired
  private MemberService memberService;
  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private LoginService loginService;

  @GetMapping("/member")
  public ResponseEntity<?> getMemberList(@RequestHeader("Authorization") String authHeader) {

    //    직원 관리 페이지 부장만 접근 가능하게 하기 위한 부분
    try {
      String token = authHeader.replace("Bearer ", "");
      String userId = jwtUtil.extractUsername(token);
      UserDTO user = loginService.getUserById(userId);

      if (user != null && user.getPosition() == 2) {
        List<UserDTO> members = memberService.getMemberList();
        return ResponseEntity.ok(members);
      } else {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없습니다.");
      }
    }
    catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
    }
  }

  @PostMapping("/addMember")
  public UserDTO addMember(@RequestBody UserDTO userDTO){
    memberService.addMember(userDTO);
    return userDTO;
  }

  @PutMapping("/updateMember")
  public ResponseEntity<?> updateMember(@RequestBody UserDTO userDTO) {
    try {
      System.out.println("받은 UserDTO" + userDTO);
      UserDTO updated = memberService.updateMember(userDTO);
      return ResponseEntity.ok(updated);  // 업데이트 후, UserDTO 반환
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패함: " + e.getMessage());
    }
  }

//  @PutMapping("/updateMember")
//  public UserDTO updateMember(@RequestBody UserDTO userDTO){
//
//    return memberService.updateMember(userDTO);
//  }

//  @PutMapping("/updateMember")
//  public ResponseEntity<?> updateMember(@RequestBody UserDTO userDTO){
//    try{
//      System.out.println("업댓할 정보"+userDTO);
//      UserDTO updated = memberService.updateMember(userDTO);
//      return ResponseEntity.ok(updated);
//    }
//    catch (Exception e){
//      e.printStackTrace();
//      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("업데이트 실패함:  "+ e.getMessage());
//    }
//  }

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
