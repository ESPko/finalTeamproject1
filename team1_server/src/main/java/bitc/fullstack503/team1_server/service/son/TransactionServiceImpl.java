package bitc.fullstack503.team1_server.service.son;
import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.TransactionDTO;
import bitc.fullstack503.team1_server.mapper.son.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService
{
  @Autowired
  private TransactionMapper transactionMapper;
  
  @Override
  public void insertTransaction (TransactionDTO transactionDTO)
  {
    transactionMapper.insertTransaction (transactionDTO);
  }
  
  @Override
  public int selectItemQuantity (int itemIdx)
  {
    return transactionMapper.selectItemQuantity (itemIdx);
  }
  
  @Override
  public int selectItemIdxByImage (ItemDTO itemDTO)
  {
    return transactionMapper.selectItemIdxByImage (itemDTO);
  }
  
  @Override
  public void updateItemQrByIdx (ItemDTO itemDTO)
  {
    transactionMapper.updateItemQrByIdx (itemDTO);
  }
}
