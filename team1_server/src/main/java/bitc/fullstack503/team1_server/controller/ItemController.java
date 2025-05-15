package bitc.fullstack503.team1_server.controller;
import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.service.ItemService;
import bitc.fullstack503.team1_server.service.son.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping ("/item")
@CrossOrigin (origins = "*")  // 모든 origin에서 요청을 허용
public class ItemController
{
  @Autowired
  private ItemService itemService;
  @Autowired
  private TransactionService transactionService;
  
  @GetMapping ("/itemList")
  public List<ItemDTO> getItemList ()
  {
    return itemService.getItemList ();
  }
  
  @PostMapping ("/add")
  public ResponseEntity<Map<String, String>> addItem (
    @RequestParam ("image") MultipartFile image,
    @RequestParam ("name") String name,
    @RequestParam ("category") String category,
    @RequestParam ("vendorName") String vendorName,
    @RequestParam ("warehouseName") String warehouseName,
    @RequestParam ("price") String price,
    @RequestParam ("standard") String standard
  )
  {
    try
    {
      // 가격과 표준을 Integer로 변환
      int priceInt = Integer.parseInt (price);
      int standardInt = Integer.parseInt (standard);
      // 이미지 업로드 처리
      String imageUrl = itemService.uploadImage (image);
      String code = vendorName + category + warehouseName;
      // 제품 정보 저장
      ItemDTO itemDTO = new ItemDTO ();
      itemDTO.setName (name);
      itemDTO.setCategory (category);
      itemDTO.setVendorName (vendorName);
      itemDTO.setWarehouseName (warehouseName);
      itemDTO.setPrice (priceInt);
      itemDTO.setStandard (standardInt);
      itemDTO.setCode (code);
      itemService.addItem (itemDTO, imageUrl);
      // qr 넣기
      ItemDTO itemDTO2 = new ItemDTO ();
      itemDTO2.setImage (imageUrl);
      int itemIdx = transactionService.selectItemIdxByImage (itemDTO2);
      String qr = itemIdx + "/" + code;
      ItemDTO itemDTO1 = new ItemDTO ();
      itemDTO1.setIdx (itemIdx);
      itemDTO1.setQr (qr);
      transactionService.updateItemQrByIdx (itemDTO1);
      return ResponseEntity.ok (Map.of ("message", "비품이 성공적으로 추가되었습니다.", "imageUrl", imageUrl));
    }
    catch (IOException e)
    {
      return ResponseEntity.status (400).body (Map.of ("error", "파일 처리 오류", "message", e.getMessage ()));
    }
    catch (NumberFormatException e)
    {
      return ResponseEntity.status (400).body (Map.of ("error", "잘못된 숫자 형식", "message", e.getMessage ()));
    }
    catch (Exception e)
    {
      return ResponseEntity.status (500).body (Map.of ("error", "아이템 추가 실패", "message", e.getMessage ()));
    }
  }
  
  // 아이템 수정 (idx로 수정)
  @PutMapping ("/update/{idx}")
  public ResponseEntity<Map<String, String>> updateItem (
    @PathVariable int idx,
    @RequestParam (required = false, value = "image") MultipartFile image,
    @RequestParam (required = false, value = "name") String name,
    @RequestParam (required = false, value = "category") String category,
    @RequestParam (required = false, value = "vendorName") String vendorName,
    @RequestParam (required = false, value = "warehouseName") String warehouseName,
    @RequestParam (required = false, value = "price") String price,
    @RequestParam (required = false, value = "standard") String standard,
    @RequestParam (required = false, value = "quantity") String quantity,
    @RequestParam (required = false, value = "userId") String userId
  )
  {
    try
    {
      // 파라미터 검증
      if (name == null || name.isEmpty ())
      {
        throw new IllegalArgumentException ("상품 이름이 누락되었습니다.");
      }
      // 가격과 표준을 Integer로 변환
      int priceInt = Integer.parseInt (price);
      int standardInt = Integer.parseInt (standard);
      int quantityInt = Integer.parseInt (quantity);
      // 기존의 imageUrl을 그대로 사용 (이미지 수정이 없는 경우)
      String imageUrl = itemService.getExistingImageUrl (idx);  // DB에서 기존 이미지 URL을 가져옴
      if (image != null && !image.isEmpty ())
      {
        // 이미지가 수정된 경우에만 처리
        imageUrl = itemService.uploadImage (image);
      }
      // transaction 용 before quantity 값 받아오기
      int before = transactionService.selectItemQuantityByIdx (idx);
      // 수정할 제품 정보 설정
      ItemDTO itemDTO = new ItemDTO ();
      itemDTO.setIdx (idx);
      itemDTO.setName (name);
      itemDTO.setCategory (category);
      itemDTO.setVendorName (vendorName);
      itemDTO.setWarehouseName (warehouseName);
      itemDTO.setPrice (priceInt);
      itemDTO.setStandard (standardInt);
      itemDTO.setImage (imageUrl);
      itemDTO.setQuantity (quantityInt);
      itemService.updateItem (idx, itemDTO, imageUrl);  // DB에 업데이트
      int after = transactionService.selectItemQuantityByIdx (idx);
      if (before != after)
      {
        TransactionDTO transactionDTO = new TransactionDTO ();
        transactionDTO.setItemIdx (idx);
        transactionDTO.setUserId (userId);
        transactionDTO.setTransaction (2);
        transactionDTO.setBefore (before);
        transactionDTO.setAfter (after);
        transactionService.insertTransaction (transactionDTO);
      }
      return ResponseEntity.ok (Map.of ("message", "비품이 성공적으로 수정되었습니다."));
    }
    catch (IOException e)
    {
      return ResponseEntity.status (400).body (Map.of ("error", "파일 처리 오류", "message", e.getMessage ()));
    }
    catch (NumberFormatException e)
    {
      return ResponseEntity.status (400).body (Map.of ("error", "잘못된 숫자 형식", "message", e.getMessage ()));
    }
    catch (IllegalArgumentException e)
    {
      return ResponseEntity.status (400).body (Map.of ("error", "잘못된 요청", "message", e.getMessage ()));
    }
    catch (Exception e)
    {
      return ResponseEntity.status (500).body (Map.of ("error", "아이템 수정 실패", "message", e.getMessage ()));
    }
  }
    // 창고에 속한 비품 수를 반환하는 API
    @GetMapping("/getWarehouseItemCount")
    public int getWarehouseItemCount(@RequestParam String warehouseName) {
        return itemService.getWarehouseItemCount(warehouseName);
    }
    // 창고에 속한 비품 상태를 숨기는 API
    @PutMapping("/hideItemsByWarehouse")
    public void hideItemsByWarehouse(@RequestParam String warehouseName) {
        itemService.hideItemsByWarehouse(warehouseName);
    }

    // 매입회사에 속한 비품 수를 반환하는 API
    @GetMapping("/getVendorItemCount")
    public int getVendorItemCount(@RequestParam String vendorName) {
        return itemService.getVendorItemCount(vendorName);
    }
    @PutMapping("/{idx}")
    public void deleteItem(@PathVariable int idx) {
      itemService.deleteItem(idx);
    }

}
