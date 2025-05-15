package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ItemMapper {
    List<ItemDTO> getItemList();

    void insertItem(ItemDTO itemDTO);

    void updateItem(ItemDTO itemDTO);

    String getExistingImageUrl(int idx);
    // 해당 창고 이름을 가진 비품이 있는지 확인
    int checkItemsInWarehouse(String warehouseName);
    // 삭제할 창고이름을 가진 비품들 상태(4)로 숨기기
    void updateHideItemWarehouse(String warehouseName);

    int checkItemsInVendor(String vendorName);

    void deleteItem(int idx);
}
