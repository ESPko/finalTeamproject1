package bitc.fullstack503.team1_server.service.son;
import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.dto.TransactionDTO;
public interface TransactionService
{
  void insertTransaction (TransactionDTO transactionDTO);
  
  int selectItemQuantityByIdx (int itemIdx);
  
  int selectItemIdxByImage (ItemDTO itemDTO);
  
  void updateItemQrByIdx (ItemDTO itemDTO);
}
