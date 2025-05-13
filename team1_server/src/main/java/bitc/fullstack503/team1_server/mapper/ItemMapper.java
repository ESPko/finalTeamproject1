package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
    List<ItemDTO> getItemList();

    void insertItem(ItemDTO itemDTO);

    void updateItem(ItemDTO itemDTO);

}
