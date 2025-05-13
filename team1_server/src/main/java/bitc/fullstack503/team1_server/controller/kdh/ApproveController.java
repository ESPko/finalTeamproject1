package bitc.fullstack503.team1_server.controller.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.security.JwtUtil;
import bitc.fullstack503.team1_server.service.kdh.ApproveService;
import bitc.fullstack503.team1_server.service.kms.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ApproveController {

  @Autowired
  ApproveService approveService;
  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private LoginService loginService;

  //  승인 목록 대기 페이지
  @GetMapping("/approve")
  public List<ItemDTO> getApproveList() {
    return approveService.getApproveList();
  }

//  승인 혹은 거절 버튼 눌렀을 때 작동하는 부분
  @PutMapping("/updateApprove")
  public ResponseEntity<?> updateApprove(@RequestBody ItemDTO item, @RequestHeader("Authorization") String authHeader) {
    try {
      String token = authHeader.replace("Bearer ", "");
      String userId = jwtUtil.extractUsername(token);
      UserDTO user = loginService.getUserById(userId);

      if (user != null && user.getPosition() == 2) {
        int idx = item.getIdx();
        int approve = item.getApprove();
        approveService.updateApprove(idx,approve);
        return ResponseEntity.ok(item);
      }
      else {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("접근 권한이 없읍니다.");
      }
    }
    catch (Exception e){
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
    }
  }

}
