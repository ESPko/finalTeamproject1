package bitc.fullstack503.team1_server.service.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;

public interface ItemService {
  List<ItemDTO> getAllItems();
  ItemDTO getItemByCode(int idx);
  void updateItem(ItemDTO item);
}
