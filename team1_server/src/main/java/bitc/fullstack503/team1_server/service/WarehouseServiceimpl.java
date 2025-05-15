package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import bitc.fullstack503.team1_server.mapper.ItemMapper;
import bitc.fullstack503.team1_server.mapper.WarehouseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceimpl implements WarehouseService {

    @Autowired
    private WarehouseMapper warehouseMapper;

    // 창고위치 들고오기 
    @Override
    public List<WarehouseDTO> getWarehouseList() {
        return warehouseMapper.getWarehouseList();
    }
    // 해당 창고 비품들고 오기 
    @Override
    public int getWarehouseItemCount(String warehouseName) {
        return warehouseMapper.getWarehouseItemCount(warehouseName);
    }
    // 창고 추가
    @Override
    public void addLocation(WarehouseDTO warehouseDTO) {
        warehouseMapper.insertLocation(warehouseDTO);
    }
    // 창고 수정
    @Override
    public void updateLocation( WarehouseDTO warehouseDTO) {
        warehouseMapper.updateLocation( warehouseDTO);
    }

    // 창고 위치 삭제
    @Override
    public void deleteWarehouse(int idx) {
        warehouseMapper.deleteWarehouse(idx);
    }
    // 창고 이름만 가지고 오기
    @Override
    public List<WarehouseDTO> getWarehouse() {
        return warehouseMapper.getWarehouse();
    }
}
