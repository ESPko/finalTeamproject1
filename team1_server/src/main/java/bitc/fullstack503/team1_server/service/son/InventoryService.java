package bitc.fullstack503.team1_server.service.son;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.dto.VendorDTO;
import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.dto.son.InventoryDTO;
import bitc.fullstack503.team1_server.dto.son.InventorySearchRequestDTO;
import bitc.fullstack503.team1_server.dto.son.StatusDTO;
import bitc.fullstack503.team1_server.dto.son.StatusRequestDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;
public interface InventoryService
{
  List<InventoryDTO> searchInventory (InventorySearchRequestDTO request);
  
  List<WarehouseDTO> selectAllWarehouse ();
  
  List<VendorDTO> selectAllVendor ();
  
  List<StatusDTO> searchStatus (@Param ("request") StatusRequestDTO request);
  
  List<UserDTO> selectAllDepartment ();
  
  List<UserDTO> selectAllNickName ();
}
