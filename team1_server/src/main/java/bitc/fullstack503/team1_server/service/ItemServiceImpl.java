package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.ItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemMapper itemMapper;

    private static final String BUCKET_NAME = "full503final";
    private static final String SUPABASE_BASE_URL = "https://dgllskanufkoatksuajq.supabase.co/storage/v1/object";
    private static final String BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnbGxza2FudWZrb2F0a3N1YWpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzcyMzY0OCwiZXhwIjoyMDYzMjk5NjQ4fQ.lyVsiAHNFBadUnWU_Ow2MCyAUKidLhcQPIUfr1mrkMA";


    @Override
    public List<ItemDTO> getItemList() {
        return itemMapper.getItemList();
    }

    @Override
    public void addItem(ItemDTO itemDTO, String imageUrl) {
        itemDTO.setImage(imageUrl);  // 이미지 URL 설정
        itemMapper.insertItem(itemDTO);  // MyBatis를 사용하여 DB에 저장
    }

    @Override
    public String uploadImage(MultipartFile image) throws IOException  {
        if (image.getSize() > 10 * 1024 * 1024) {  // 10MB
            throw new IOException("파일 크기가 너무 큽니다. 최대 10MB로 제한됩니다.");
        }

        String originalFilename = image.getOriginalFilename ();
        String uniqueFileName = "image/" + UUID.randomUUID () + "-" + originalFilename;
        String uploadUrl = String.format ("%s/%s/%s", SUPABASE_BASE_URL, BUCKET_NAME, uniqueFileName);
        String publicUrl = String.format ("%s/public/%s/%s", SUPABASE_BASE_URL, BUCKET_NAME, uniqueFileName);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(image.getContentType()));
        headers.setBearerAuth(BEARER_TOKEN);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(image.getBytes(), headers);
        ResponseEntity<String> response = new RestTemplate().exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode() != HttpStatus.OK) {
            throw new IOException("이미지 업로드에 실패했습니다.");
        }

        // 반환할 URL
        return publicUrl;
    }


    @Override
    public void updateItem(int idx, ItemDTO itemDTO, String imageUrl) {
        itemDTO.setIdx(idx);  // idx 설정
        itemDTO.setImage(imageUrl);  // 이미지 URL 설정
        itemMapper.updateItem(itemDTO);
    }

    @Override
    public String getExistingImageUrl(int idx) {
        return itemMapper.getExistingImageUrl(idx);
    }

    // 창고에 있는 비품 수를 가져오는 메서드
    @Override
    public int getWarehouseItemCount(String warehouseName) {
        return itemMapper.checkItemsInWarehouse(warehouseName);
    }

    // 비품 상태 숨기기 메서드
    @Override
    public void hideItemsByWarehouse(String warehouseName) {
        itemMapper.updateHideItemWarehouse(warehouseName);
    }

    // 매입회사에 있는 비품 수를 가져오는 메서드
    @Override
    public int getVendorItemCount(String vendorName) {
        return itemMapper.checkItemsInVendor(vendorName);
    }

    @Override
    public void deleteItem(int idx) {
        itemMapper.deleteItem(idx);
    }

}
