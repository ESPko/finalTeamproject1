package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.*;

@Mapper
public interface ItemStockMapper {

  @Select("SELECT * FROM item WHERE idx = #{idx}")
  ItemDTO selectByIdx(@Param("idx") Long idx);  // Long으로 수정

  @Update("UPDATE item SET quantity = #{quantity} WHERE idx = #{idx}")
  void update(ItemDTO item);
}
