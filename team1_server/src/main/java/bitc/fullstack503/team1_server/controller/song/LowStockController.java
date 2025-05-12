package bitc.fullstack503.team1_server.controller.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.park.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lowstock")
public class LowStockController {

  @Autowired
  private ItemService itemService;

  @GetMapping
  public List<ItemDTO> getLowStockItems() {
    return itemService.getAllItems().stream()
        .filter(item -> item.getQuantity() < item.getStandard())
        .collect(Collectors.toList());
  }
}
