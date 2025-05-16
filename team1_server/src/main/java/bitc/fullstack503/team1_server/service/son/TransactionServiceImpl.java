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
  public int selectItemQuantityByIdx (int itemIdx)
  {
    return transactionMapper.selectItemQuantityByIdx (itemIdx);
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
  
  @Override
  public String selectWarehouseNameByIdx (int idx)
  {
    return transactionMapper.selectWarehouseNameByIdx (idx);
  }
  
  @Override
  public void updateItemWarehouseAfterNameByBeforeName (String beforeName, String afterName)
  {
    transactionMapper.updateItemWarehouseAfterNameByBeforeName (beforeName, afterName);
  }
  
  @Override
  public String selectVendorNameByIdx (int idx)
  {
    return transactionMapper.selectVendorNameByIdx (idx);
  }
  
  @Override
  public void updateItemVendorAfterNameByBeforeName (String beforeName, String afterName)
  {
    transactionMapper.updateItemVendorAfterNameByBeforeName (beforeName, afterName);
  }
}
