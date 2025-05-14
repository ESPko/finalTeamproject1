package bitc.fullstack503.team1_server.controller.kdh;

import bitc.fullstack503.team1_server.mapper.kdh.MainPageMapper;
import bitc.fullstack503.team1_server.service.kdh.MainPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MainPageController {

  @Autowired
  private MainPageService mainPageService;

  @GetMapping("/todayStock")
  public ResponseEntity<Map<String, Integer>> getTodayStock(){
    Map<String, Integer> todayStock = mainPageService.getTodayStock();
    return ResponseEntity.ok(todayStock);
  }

}
