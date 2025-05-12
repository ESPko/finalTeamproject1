package bitc.fullstack503.team1_server.mapper.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.ShipmentDetailResponse;
import bitc.fullstack503.team1_server.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


import java.util.List;

@Mapper
public interface ItemMapper {
  List<ItemDTO> getAllItems();
  ItemDTO getItemByCode(int idx);
  void updateItem(ItemDTO item);
  void insertTransaction(TransactionDTO transaction);
  void decreaseItemQuantity(int idx, long quantityToSubtract);
  List<ShipmentDetailResponse> getShipmentDetails(@Param("userId") String userId);
  int getTodayTotalIn();
  int getTodayTotalOut();
}
