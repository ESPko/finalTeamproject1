package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.TransactionDTO;

import java.util.List;

public interface StockMovementService {
    List<TransactionDTO> getStockMovements(String startDate, String endDate);
}
