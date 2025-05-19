package bitc.fullstack503.team1_server.controller.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.ShipmentDetailResponse;
import bitc.fullstack503.team1_server.security.JwtUtil;
import bitc.fullstack503.team1_server.service.park.FlutterService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class FlutterController {

  private final FlutterService flutterService;

  @GetMapping
  public ResponseEntity<List<ItemDTO>> getAllItems(HttpServletResponse response) {
    return ResponseEntity.ok(flutterService.getAllItems());
  }


  @GetMapping("/{idx}")
  public ItemDTO getItem(@PathVariable int idx) {
    return flutterService.getItemByCode(idx);
  }

  @PutMapping
  public void updateItem(@RequestBody ItemDTO item) {
    flutterService.updateItem(item);
  }

  // ✅ QR 스캔으로 비품 출고

  // 수정된 코드
  @PatchMapping("/{idx}/dispatch-quantity")
  public ResponseEntity<ItemDTO> dispatchItemQuantity(
    @PathVariable("idx") int idx,
    @RequestBody Map<String, Object> request) {

    // 1. 요청값 검증
    Integer quantityToSubtract = (Integer) request.get("quantityToSubtract");
    String userId = (String) request.get("userId"); // ✅ userId 함께 받기

    if (userId == null || userId.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "userId가 필요합니다.");
    }

    if (quantityToSubtract == null || quantityToSubtract <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "차감 수량은 1 이상이어야 합니다.");
    }

    // 2. 비즈니스 로직: 수량 차감 + 트랜잭션 기록
    flutterService.decreaseItemQuantity(idx, userId, quantityToSubtract);

    // 3. 변경된 아이템 정보 반환
    ItemDTO updatedItem = flutterService.getItemByCode(idx);
    return ResponseEntity.ok(updatedItem);
  }

  @Autowired
private JwtUtil jwtUtil;
  // 출고 기록 조회
  @GetMapping("/getShipmentDetails")
  public List<ShipmentDetailResponse> getShipmentDetails(@RequestHeader("Authorization") String authHeader) {
    // 헤더를 제대로 추출하는지 확인하는 로그 추가
    System.out.println("Authorization 헤더: " + authHeader);

    // JWT 토큰 처리 및 사용자 이름 추출
    String token = authHeader.substring(7); // "Bearer " 제거
    String userName = jwtUtil.extractUsername(token);

    // 사용자 이름을 기반으로 출고 내역을 조회
    List<ShipmentDetailResponse> shipmentDetails = flutterService.getShipmentDetails(userName);

    // 출고 내역이 제대로 반환되었는지 확인하는 로그 추가
    System.out.println("출고 내역 조회 결과: " + shipmentDetails);

    return shipmentDetails;
  }

  @GetMapping("/summary")
  public Map<String, Integer> getTodaySummary() {
    Map<String, Integer> result = new HashMap<>();
    result.put("totalIn", flutterService.getTodayTotalIn());
    result.put("totalOut", flutterService.getTodayTotalOut());
    return result;
  }


}
