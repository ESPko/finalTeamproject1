package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.VendorDTO;
import bitc.fullstack503.team1_server.mapper.VendorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorServiceImpl implements VendorService {

    @Autowired
    private VendorMapper vendorMapper;


    @Override
    public List<VendorDTO> getVendorList() {
        return vendorMapper.getVendorList();
    }

    @Override
    public void updateVendor(VendorDTO vendorDTO) {
        vendorMapper.updateVendor(vendorDTO);
    }

    @Override
    public void insertVendor(VendorDTO vendorDTO) {
        vendorMapper.insertVendor(vendorDTO);
    }

    @Override
    public void deleteVendor(int idx) {
        vendorMapper.deleteVendor(idx);
    }

    @Override
    public List<VendorDTO> getVendorName() {
        return vendorMapper.getVendorName();}

}
