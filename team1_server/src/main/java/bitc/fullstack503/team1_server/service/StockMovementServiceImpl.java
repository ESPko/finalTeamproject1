package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.mapper.StockMovementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockMovementServiceImpl implements StockMovementService {

    @Autowired
    private StockMovementMapper stockMovementMapper;

    @Override
    public List<TransactionDTO> getStockMovements(String startDate, String endDate) {
        return stockMovementMapper.getStockMovementsByDateRange(startDate, endDate);
    }
}
