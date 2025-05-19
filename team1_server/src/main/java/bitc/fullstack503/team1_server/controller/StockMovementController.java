package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.min.StockMovementDTO;
import bitc.fullstack503.team1_server.service.StockMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StockMovementController {

    @Autowired
    private StockMovementService stockMovementService;

    // 날짜 범위에 맞는 입출고 데이터를 반환
    @GetMapping("/stock-movements")
    public List<StockMovementDTO> getStockMovements(@RequestParam String startDate, @RequestParam String endDate) {
        return stockMovementService.getStockMovements(startDate, endDate);
    }
}
