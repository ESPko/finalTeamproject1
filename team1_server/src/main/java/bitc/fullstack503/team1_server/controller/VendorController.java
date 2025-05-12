package bitc.fullstack503.team1_server.controller;

import bitc.fullstack503.team1_server.dto.VendorDTO;
import bitc.fullstack503.team1_server.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendor")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @GetMapping("/vendorList")
    public List<VendorDTO> getVendorList() {
        return vendorService.getVendorList();
    }

    @PutMapping("/{idx}")
    public void updateVendor(@PathVariable int idx, @RequestBody VendorDTO vendorDTO) {
        vendorDTO.setIdx(idx);
        vendorService.updateVendor(vendorDTO);
    }

    @PostMapping("/vendorAdd")
    public void insertVendor(@RequestBody VendorDTO vendorDTO) {
        vendorService.insertVendor(vendorDTO);
    }

    @DeleteMapping("/{idx}")
    public void deleteVendor(@PathVariable int idx) {
        vendorService.deleteVendor(idx);
    }

    @GetMapping("/name")
    public List<VendorDTO> getVendorName() {
        return vendorService.getVendorName();
    }

}
