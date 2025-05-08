package bitc.fullstack503.team1_server.controller.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.park.ItemService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

  private final ItemService itemService;

  @GetMapping
  public ResponseEntity<List<ItemDTO>> getAllItems(HttpServletResponse response) {
    return ResponseEntity.ok(itemService.getAllItems());
  }


  @GetMapping("/{idx}")
  public ItemDTO getItem(@PathVariable int idx) {
    return itemService.getItemByCode(idx);
  }

  @PutMapping
  public void updateItem(@RequestBody ItemDTO item) {
    itemService.updateItem(item);
  }

  // ✅ QR 스캔으로 비품 출고

  // 수정된 코드
  @PatchMapping("/{idx}/dispatch-quantity")
  public ResponseEntity<ItemDTO> dispatchItemQuantity(
    @PathVariable("idx") int idx,
    @RequestBody Map<String, Integer> request) {

    Integer quantityToSubtract = request.get("quantityToSubtract");

    if (quantityToSubtract == null || quantityToSubtract <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "차감 수량은 1 이상이어야 합니다.");
    }

    ItemDTO item = itemService.getItemByCode(idx);
    if (item == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 ID의 아이템을 찾을 수 없습니다.");
    }

    int currentQuantity = item.getQuantity();
    if (currentQuantity < quantityToSubtract) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "차감 수량이 현재 재고보다 많습니다.");
    }

    // 수량 차감
    item.setQuantity(currentQuantity - quantityToSubtract);
    itemService.updateItem(item); // void 반환

    // 차감된 최신 정보 반환
    ItemDTO updatedItem = itemService.getItemByCode(idx);

    return ResponseEntity.ok(updatedItem);
  }
}
