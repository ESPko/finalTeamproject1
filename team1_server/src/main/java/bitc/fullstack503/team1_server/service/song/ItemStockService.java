package bitc.fullstack503.team1_server.service.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.Map;

public interface ItemStockService {
  ItemDTO getItemByIdx(Long idx);
  void receiveItemWithInfo(Long idx, Map<String, Object> data);

}
