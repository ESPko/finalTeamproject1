package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.song.ReceiveItemRequest;
import bitc.fullstack503.team1_server.service.song.ItemStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemStockController {

  private final ItemStockService itemStockService;

  @PutMapping("/{idx}/receive")
  public ResponseEntity<String> receiveItem(
      @PathVariable Long idx,
      @RequestBody ReceiveItemRequest request) {

    Integer quantityToAdd = request.getQuantity();
    if (quantityToAdd == null || quantityToAdd <= 0) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "입고 수량은 1 이상이어야 합니다.");
    }

    ItemDTO item = itemStockService.getItemByIdx(idx);
    if (item == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "해당 ID의 아이템을 찾을 수 없습니다.");
    }

    itemStockService.addItemQuantity(idx, quantityToAdd);

    return ResponseEntity.ok("입고가 완료되었습니다.");
  }
}
