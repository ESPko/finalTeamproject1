package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.service.WarehouseService;
import bitc.fullstack503.team1_server.service.son.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/warehouseList")
    public List<WarehouseDTO> getWarehouseList() {
        return warehouseService.getWarehouseList();
    }

    @GetMapping("/warehouseItemCount")
    public int getWarehouseItemCount(@RequestParam String warehouseName) {
        return warehouseService.getWarehouseItemCount(warehouseName);
    }

    @PostMapping("/addLocation")
    public ResponseEntity<String> addLocation(@RequestBody WarehouseDTO warehouseDTO) {
        try {
            warehouseService.addLocation(warehouseDTO);
            return ResponseEntity.ok("위치 추가 성공!");
        } catch (Exception e) {
            // 예외 발생 시 경고 메시지와 함께 400 상태 코드 반환
            return ResponseEntity.status(400).body("이미 존재하는 위치입니다.");
        }
    }


    @PutMapping("/updateLocation/{idx}")
    public String updateLocation(@PathVariable int idx, @RequestBody WarehouseDTO warehouseDTO) {
        try {
            String beforeName = transactionService.selectWarehouseNameByIdx(idx);
            warehouseService.updateLocation(warehouseDTO);
            String afterName = warehouseDTO.getName();
            if (!beforeName.equals(afterName)) {
                transactionService.updateItemWarehouseAfterNameByBeforeName(beforeName, afterName);
            }
            System.out.println("위치 수정 완료"); // 로그 추가
            return "위치가 성공적으로 수정되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "위치 수정에 실패했습니다.";
        }
    }

    @DeleteMapping("/{idx}")
    public void deleteLocation(@PathVariable int idx) {
        // 창고 삭제
        warehouseService.deleteWarehouse(idx);
    }

    @GetMapping("/name")
    public List<WarehouseDTO> getWarehouse() {
        return warehouseService.getWarehouse();
    }
}
