package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.mapper.WarehouseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceimpl implements WarehouseService {

    @Autowired
    private WarehouseMapper warehouseMapper;

    @Override
    public List<WarehouseDTO> getWarehouseList() {
        return warehouseMapper.getWarehouseList();
    }

    @Override
    public int getWarehouseItemCount(String warehouseName) {
        return warehouseMapper.getWarehouseItemCount(warehouseName);
    }

    @Override
    public void addLocation(WarehouseDTO warehouseDTO) {
        warehouseMapper.insertLocation(warehouseDTO);
    }

    @Override
    public void updateLocation(int idx, WarehouseDTO warehouseDTO) {
        warehouseMapper.updateLocaiton(idx, warehouseDTO);
    }
}
