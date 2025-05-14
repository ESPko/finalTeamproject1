package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.mapper.kdh.MainPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MainPageServiceImpl implements MainPageService {

  @Autowired
  MainPageMapper mainPageMapper;

  @Override
  public Map<String, Integer> getTodayStock() {
    List<TransactionDTO> todayStock = mainPageMapper.getTodayStock();

//            입고
    int totalInput = 0;
//            출고
    int totalOutput = 0;
//            재고 수량
    int totalAfter = 0;
//            전체 수량
    int totalBefore = 0;

    for (TransactionDTO t : todayStock) {
      totalAfter += t.getAfter();
      totalBefore += t.getBefore();

      if (t.getAfter() > t.getBefore()) {
        totalInput += t.getAfter() - t.getBefore();
      } else if (t.getTransaction() == 1 || t.getAfter() < t.getBefore()) {
        totalOutput += t.getBefore() - t.getAfter();
      }
    }
    Map<String, Integer> result = new HashMap<>();
    result.put("totalBefore", totalBefore); //전체 수량
    result.put("totalAfter", totalAfter); //총 재고 수량
    result.put("totalInput", totalInput); //입고 수량
    result.put("totalOutput", totalOutput); //출고 수량
    return result;
  }

  @Override
  public List<ItemDTO> inputRequestList() {
    return mainPageMapper.inputRequestList();
  }

}
