package bitc.fullstack503.team1_server.mapper.song;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemStockMapper {

  @Select("SELECT * FROM item WHERE idx = #{idx}")
  ItemDTO selectByIdx(@Param("idx") Long idx);  // Long으로 수정

  @Update("UPDATE item SET quantity = #{quantity}, time=#{receivedDate}, memo = #{memo} WHERE idx = #{idx}")
  void updateItemInfo(Map<String, Object> paramMap);

  // 부족 재고 아이템을 조회하는 쿼리 추가
  @Select("SELECT * FROM item WHERE quantity < standard")
  List<ItemDTO> selectLowStockItems();
}
