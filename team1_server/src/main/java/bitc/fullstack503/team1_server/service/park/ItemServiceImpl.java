package bitc.fullstack503.team1_server.service.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.ShipmentDetailResponse;
import bitc.fullstack503.team1_server.mapper.park.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import bitc.fullstack503.team1_server.dto.TransactionDTO; // ✅ DTO 클래스


import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

  private final ItemMapper itemMapper;

  @Override
  public List<ItemDTO> getAllItems() {
    return itemMapper.getAllItems();
  }

  @Override
  public ItemDTO getItemByCode(int idx) {
    return itemMapper.getItemByCode(idx);
  }

  @Override
  public void updateItem(ItemDTO item) {
    itemMapper.updateItem(item);
  }

  @Override
  public void insertTransaction(TransactionDTO transaction) {
    itemMapper.insertTransaction(transaction);
  }

  public void decreaseItemQuantity(int itemIdx, String userId, int qtyToDeduct) {
    ItemDTO item = itemMapper.getItemByCode(itemIdx);
    if (item == null) {
      throw new RuntimeException("Item not found");
    }

    int beforeQty = item.getQuantity();
    if (beforeQty < qtyToDeduct) {
      throw new RuntimeException("재고 부족");
    }

    int afterQty = beforeQty - qtyToDeduct;
    item.setQuantity(afterQty);
    itemMapper.updateItem(item);

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
    return itemMapper.getShipmentDetails(userId);
  }

  public int getTodayTotalIn() {
    return itemMapper.getTodayTotalIn();
  }

  public int getTodayTotalOut() {
    return itemMapper.getTodayTotalOut();
  }

}
