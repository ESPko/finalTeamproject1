package bitc.fullstack503.team1_server.controller.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.park.FlutterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lowstock")
public class LowStockController {

  @Autowired
  private FlutterService flutterService;

  @GetMapping
  public List<ItemDTO> getLowStockItems() {
    return flutterService.getAllItems().stream()
        .filter(item -> item.getQuantity() < item.getStandard())
        .collect(Collectors.toList());
  }
}
