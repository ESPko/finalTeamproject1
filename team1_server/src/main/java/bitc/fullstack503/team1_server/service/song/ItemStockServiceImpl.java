package bitc.fullstack503.team1_server.service.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.ItemStockMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ItemStockServiceImpl implements ItemStockService {

  private final ItemStockMapper itemStockMapper;

  @Override
  public ItemDTO getItemByIdx(Long idx) {
    return itemStockMapper.selectByIdx(idx);
  }

  @Override
  public void receiveItemWithInfo(Long idx, Map<String, Object> data) {
    Integer quantityToAdd = (Integer) data.get("quantity");
    String receivedDate = (String) data.get("receivedDate");
    String memo = (String) data.get("memo");

    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("idx", idx);
    paramMap.put("quantity", quantityToAdd);
    paramMap.put("receivedDate", receivedDate);
    paramMap.put("memo", memo);

    itemStockMapper.updateItemInfo(paramMap);
  }

}
