package bitc.fullstack503.team1_server.service.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.park.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
