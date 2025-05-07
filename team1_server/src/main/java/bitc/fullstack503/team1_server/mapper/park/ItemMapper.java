package bitc.fullstack503.team1_server.mapper.park;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
  List<ItemDTO> getAllItems();
  ItemDTO getItemByCode(int idx);
  void updateItem(ItemDTO item);
}
