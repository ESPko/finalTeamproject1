package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.service.ItemService;
import bitc.fullstack503.team1_server.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;


    @GetMapping("/itemList")
    public List<ItemDTO> getItemList(){
        return itemService.getItemList();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody ItemDTO itemDTO){
        itemService.addItem(itemDTO);
        return ResponseEntity.ok("비품 승인 요청되었습니다.");
    }

}
