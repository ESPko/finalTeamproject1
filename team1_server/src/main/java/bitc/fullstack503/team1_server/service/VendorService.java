package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.VendorDTO;

import java.util.List;

public interface VendorService {

    List<VendorDTO> getVendorList();

    void updateVendor(VendorDTO vendorDTO);

    void insertVendor(VendorDTO vendorDTO);

    void deleteVendor(int idx);

    List<VendorDTO> getVendorName();

}
