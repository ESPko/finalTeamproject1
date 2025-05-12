package bitc.fullstack503.team1_server.service.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;

public interface ItemStockService {
  ItemDTO getItemByIdx(Long idx);
  void addItemQuantity(Long idx, int quantityToAdd);
}
