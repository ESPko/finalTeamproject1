package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StockMovementMapper {
    List<TransactionDTO> getStockMovementsByDateRange(String startDate, String endDate);
}
