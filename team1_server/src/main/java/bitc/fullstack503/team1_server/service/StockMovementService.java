package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.dto.min.StockMovementDTO;

import java.util.List;

public interface StockMovementService {
    List<StockMovementDTO> getStockMovements(String startDate, String endDate);
}
