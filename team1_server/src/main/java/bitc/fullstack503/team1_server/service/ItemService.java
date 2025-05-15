package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getItemList();

    void addItem(ItemDTO itemDTO, String imageUrl);

    String uploadImage(MultipartFile image) throws Exception;

    void updateItem(int idx, ItemDTO itemDTO, String imageUrl);

    String getExistingImageUrl(int idx);

    // 창고에 있는 비품 수를 가져오는 메서드
    int getWarehouseItemCount(String warehouseName);

    // 비품 상태 숨기기 메서드
    void hideItemsByWarehouse(String warehouseName);

    int getVendorItemCount(String vendorName);


    void deleteItem(int idx);
}
