package bitc.fullstack503.team1_server.mapper.kdh;

import bitc.fullstack503.team1_server.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainPageMapper {
  List<TransactionDTO> getTodayStock();
}
