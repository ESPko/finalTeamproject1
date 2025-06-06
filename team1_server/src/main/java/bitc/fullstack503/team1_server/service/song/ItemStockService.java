package bitc.fullstack503.team1_server.service.song;
import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;
import java.util.Map;
public interface ItemStockService
{
  ItemDTO getItemByIdx (Long idx);
  
  void receiveItemWithInfo (Long idx, Map<String, Object> data);
  
  List<ItemDTO> getLowStockItems (); // 인터페이스에 선언
  
  // 입고 처리 시 approve 값을 1로 업데이트
  void updateItemApprovalToReceive (Long idx);
  
  // 부족 재고 처리 시 approve 값을 3으로 업데이트
  void updateItemApprovalToLowStock (Long idx);
}
