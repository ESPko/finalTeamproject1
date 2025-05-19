package bitc.fullstack503.team1_server.controller;
import bitc.fullstack503.team1_server.dto.VendorDTO;
import bitc.fullstack503.team1_server.service.VendorService;
import bitc.fullstack503.team1_server.service.son.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping ("/vendor")
public class VendorController
{
  @Autowired
  private VendorService vendorService;
  @Autowired
  private TransactionService transactionService;
  
  @GetMapping ("/vendorList")
  public List<VendorDTO> getVendorList ()
  {
    return vendorService.getVendorList ();
  }
  
  @PutMapping ("/{idx}")
  public void updateVendor (@PathVariable int idx, @RequestBody VendorDTO vendorDTO)
  {
    vendorDTO.setIdx (idx);
    String beforeName = transactionService.selectVendorNameByIdx (idx);
    vendorService.updateVendor (vendorDTO);
    String afterName = vendorDTO.getName ();
    if (!beforeName.equals (afterName))
    {
      transactionService.updateItemVendorAfterNameByBeforeName (beforeName, afterName);
    }
  }

    @PostMapping ("/vendorAdd")
    public void insertVendor (@RequestBody VendorDTO vendorDTO)
    {
        vendorService.insertVendor (vendorDTO);
    }
  
  @DeleteMapping ("/{idx}")
  public void deleteVendor (@PathVariable int idx)
  {
    vendorService.deleteVendor (idx);
  }
  
  @GetMapping ("/name")
  public List<VendorDTO> getVendorName ()
  {
    return vendorService.getVendorName ();
  }
}
