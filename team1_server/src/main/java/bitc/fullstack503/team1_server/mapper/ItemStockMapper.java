package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.*;

import java.util.Map;

@Mapper
public interface ItemStockMapper {

  @Select("SELECT * FROM item WHERE idx = #{idx}")
  ItemDTO selectByIdx(@Param("idx") Long idx);  // Long으로 수정

  @Update("UPDATE item SET quantity = #{quantity}, time=#{receivedDate}, memo = #{memo} WHERE idx = #{idx}")
  void updateItemInfo(Map<String, Object> paramMap);

}
