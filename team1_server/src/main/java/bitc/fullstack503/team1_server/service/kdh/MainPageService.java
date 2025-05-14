package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;
import java.util.Map;

public interface MainPageService {
  Map<String, Integer> getTodayStock();

  List<ItemDTO> inputRequestList();
}