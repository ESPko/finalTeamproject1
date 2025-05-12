package bitc.fullstack503.team1_server.service.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.ItemStockMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemStockServiceImpl implements ItemStockService {

  private final ItemStockMapper itemStockMapper;

  @Override
  public ItemDTO getItemByIdx(Long idx) {
    return itemStockMapper.selectByIdx(idx);
  }

  @Override
  public void addItemQuantity(Long idx, int quantityToAdd) {
    ItemDTO item = itemStockMapper.selectByIdx(idx);
    if (item == null) {
      throw new RuntimeException("해당 아이템을 찾을 수 없습니다.");
    }

    int updatedQuantity = item.getQuantity() + quantityToAdd;
    item.setQuantity(updatedQuantity);
    itemStockMapper.update(item);
  }
}
