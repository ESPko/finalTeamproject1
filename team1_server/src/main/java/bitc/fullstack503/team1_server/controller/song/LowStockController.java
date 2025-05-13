package bitc.fullstack503.team1_server.controller.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.park.ItemService;
import bitc.fullstack503.team1_server.service.song.ItemStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lowstock")
@RequiredArgsConstructor
public class LowStockController {

  private final ItemService itemService;
  private final ItemStockService itemStockService;

  // ✔ 재고 부족 아이템 조회
  @GetMapping
  public List<ItemDTO> getLowStockItems() {
    return itemService.getAllItems().stream()
        .filter(item -> item.getQuantity() < item.getStandard())
        .collect(Collectors.toList());
  }

  // ✔ approve 상태 변경 (ex. 발주 요청 상태로)
  @PutMapping("/{idx}/approve")
  public ResponseEntity<String> updateItemApproval(@PathVariable Long idx, @RequestBody Map<String, Object> requestMap) {
    Integer approve = (Integer) requestMap.get("approve");
    if (approve == null) {
      return ResponseEntity.badRequest().body("approve 값이 누락되었습니다.");
    }

    ItemDTO item = itemStockService.getItemByIdx(idx);
    if (item == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이템을 찾을 수 없습니다.");
    }

    // 부족 재고 처리 시 approve 값을 3으로 설정
    itemStockService.updateItemApprovalToLowStock(idx);

    return ResponseEntity.ok("아이템의 approve 상태가 변경되었습니다.");
  }

  // 부족 재고 처리 (approve 값을 3으로 설정)
  @PutMapping("/{idx}/low-stock")
  public ResponseEntity<String> handleLowStock(@PathVariable Long idx) {
    // 부족 재고 처리 시 approve 값을 3으로 변경
    itemStockService.updateItemApprovalToLowStock(idx);

    return ResponseEntity.ok("부족 재고 처리 완료되었습니다.");
  }
}
