package bitc.fullstack503.team1_server.controller.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.song.ItemStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemStockController {

  private final ItemStockService itemStockService;

  // 입고 처리 (approve 값을 1로 설정)
  @PutMapping("/{idx}/receive")
  public ResponseEntity<String> receiveItem(@PathVariable Long idx, @RequestBody Map<String, Object> requestMap) {
    Integer approve = (Integer) requestMap.get("approve");
    if (approve == null) {
      return ResponseEntity.badRequest().body("approve 값이 누락되었습니다.");
    }

    // 입고 처리 시 approve 값을 1로 변경
    itemStockService.updateItemApprovalToReceive(idx);

    // 아이템 존재 여부 확인
    ItemDTO item = itemStockService.getItemByIdx(idx);
    if (item == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 ID의 아이템을 찾을 수 없습니다.");
    }

    // 입고 처리
    itemStockService.receiveItemWithInfo(idx, requestMap);

    return ResponseEntity.ok("입고가 완료되었습니다.");
  }



}
