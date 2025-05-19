package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.dto.min.StockMovementDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StockMovementMapper {
    List<StockMovementDTO> getStockMovementsByDateRange(String startDate, String endDate);
}
