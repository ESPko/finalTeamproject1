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
}
