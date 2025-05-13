package bitc.fullstack503.team1_server.controller.son;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.dto.VendorDTO;
import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.dto.son.InventoryDTO;
import bitc.fullstack503.team1_server.dto.son.InventorySearchRequestDTO;
import bitc.fullstack503.team1_server.dto.son.StatusDTO;
import bitc.fullstack503.team1_server.dto.son.StatusRequestDTO;
import bitc.fullstack503.team1_server.service.son.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping ("/api")
public class InventoryController
{
  @Autowired
  private InventoryService inventoryService;
  
  @PostMapping ("/inventory/search")
  public List<InventoryDTO> searchInventory (@RequestBody InventorySearchRequestDTO request)
  {
    return inventoryService.searchInventory (request);
  }
  
  @GetMapping ("/warehouses")
  public List<WarehouseDTO> selectAllWarehouse ()
  {
    return inventoryService.selectAllWarehouse ();
  }
  
  @GetMapping ("/vendors")
  public List<VendorDTO> selectAllVendor ()
  {
    return inventoryService.selectAllVendor ();
  }
  
  @PostMapping ("/status/search")
  public List<StatusDTO> searchStatus (@RequestBody StatusRequestDTO request)
  {
    return inventoryService.searchStatus (request);
  }
  
  @GetMapping ("/departments")
  public List<UserDTO> selectAllDepartment ()
  {
    return inventoryService.selectAllDepartment ();
  }
  
  @GetMapping ("/nickNames")
  public List<UserDTO> selectAllNickName ()
  {
    return inventoryService.selectAllNickName ();
  }
}
