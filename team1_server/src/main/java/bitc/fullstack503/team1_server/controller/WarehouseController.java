package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/warehouse")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping("/warehouseList")
    public List<WarehouseDTO> getWarehouseList() {
        return warehouseService.getWarehouseList();
    }

    @GetMapping("/warehouseItemCount")
    public int getWarehouseItemCount(@RequestParam String warehouseName) {
        return warehouseService.getWarehouseItemCount(warehouseName);
    }

    @PostMapping("/addLocation")
    public String addlocation(@RequestBody WarehouseDTO warehouseDTO) {
        try {
            warehouseService.addLocation(warehouseDTO);
            return "위치 추가 성공!";
        } catch (Exception e) {
            return "위치 추가 실패: " + e.getMessage();
        }
    }

    @PutMapping("/updateLocation/{idx}")
    public String updateLocation(@PathVariable int idx, @RequestBody WarehouseDTO warehouseDTO) {
        try {
            warehouseService.updateLocation(warehouseDTO);
            System.out.println("위치 수정 완료"); // 로그 추가
            return "위치가 성공적으로 수정되었습니다.";
        } catch (Exception e) {
            e.printStackTrace();
            return "위치 수정에 실패했습니다.";
        }
    }

    @DeleteMapping("/{idx}")
    public void deleteLocation(@PathVariable int idx) {
        warehouseService.deleteWarehouse(idx);
    }

    @GetMapping("/name")
    public List<WarehouseDTO> getWarehouse(){
        return warehouseService.getWarehouse();
    }
}
