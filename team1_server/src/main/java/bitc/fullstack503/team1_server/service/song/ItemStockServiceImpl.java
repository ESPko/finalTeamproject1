package bitc.fullstack503.team1_server.service.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.song.ItemStockMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
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

    // 필요한 파라미터만 전달
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("idx", idx);
    paramMap.put("quantity", quantityToAdd);

    itemStockMapper.updateItemInfo(paramMap);
  }

  @Override
  public List<ItemDTO> getLowStockItems() {
    return itemStockMapper.selectLowStockItems();
  }

  @Override
  public void updateItemApprovalToReceive(Long idx) {
    // 입고 처리 시 approve 값을 1로 업데이트
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("idx", idx);
    paramMap.put("approve", 1);

    itemStockMapper.updateItemApproval(paramMap);
  }

  @Override
  public void updateItemApprovalToLowStock(Long idx) {
    // 부족 재고 처리 시 approve 값을 3으로 업데이트
    Map<String, Object> paramMap = new HashMap<>();
    paramMap.put("idx", idx);
    paramMap.put("approve", 3);

    itemStockMapper.updateItemApproval(paramMap);
  }
}
