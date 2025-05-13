package bitc.fullstack503.team1_server.service.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.ShipmentDetailResponse;
import bitc.fullstack503.team1_server.mapper.park.FlutterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import bitc.fullstack503.team1_server.dto.TransactionDTO; // ✅ DTO 클래스


import java.util.List;

@Service
@RequiredArgsConstructor
public class FlutterServiceImpl implements FlutterService {

  private final FlutterMapper flutterMapper;

  @Override
  public List<ItemDTO> getAllItems() {
    return flutterMapper.getAllItems();
  }

  @Override
  public ItemDTO getItemByCode(int idx) {
    return flutterMapper.getItemByCode(idx);
  }

  @Override
  public void updateItem(ItemDTO item) {
    flutterMapper.updateItem(item);
  }

  @Override
  public void insertTransaction(TransactionDTO transaction) {
    flutterMapper.insertTransaction(transaction);
  }

  public void decreaseItemQuantity(int itemIdx, String userId, int qtyToDeduct) {
    ItemDTO item = flutterMapper.getItemByCode(itemIdx);
    if (item == null) {
      throw new RuntimeException("Item not found");
    }

    int beforeQty = item.getQuantity();
    if (beforeQty < qtyToDeduct) {
      throw new RuntimeException("재고 부족");
    }

    int afterQty = beforeQty - qtyToDeduct;
    item.setQuantity(afterQty);
    flutterMapper.updateItem(item);

    TransactionDTO tx = new TransactionDTO();
    tx.setItemIdx(itemIdx);
    tx.setUserId(userId);
    tx.setTransaction(1); // 1 = 출고
    tx.setBefore(beforeQty);
    tx.setAfter(afterQty);

    insertTransaction(tx);
  }


  @Override
  public List<ShipmentDetailResponse> getShipmentDetails(String userId) {
    return flutterMapper.getShipmentDetails(userId);
  }

  public int getTodayTotalIn() {
    return flutterMapper.getTodayTotalIn();
  }

  public int getTodayTotalOut() {
    return flutterMapper.getTodayTotalOut();
  }

}
