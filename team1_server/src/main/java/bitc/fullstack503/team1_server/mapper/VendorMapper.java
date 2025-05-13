package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.VendorDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VendorMapper {

    List<VendorDTO> getVendorList();

    void updateVendor(VendorDTO vendorDTO);

    void insertVendor(VendorDTO vendorDTO);

    void deleteVendor(int idx);

    List<VendorDTO> getVendorName();
}
