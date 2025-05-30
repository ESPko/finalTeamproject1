package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;

import java.util.List;

public interface WarehouseService {
    List<WarehouseDTO> getWarehouseList();

    int getWarehouseItemCount(String warehouseName);

    void addLocation(WarehouseDTO warehouseDTO);

    void updateLocation( WarehouseDTO warehouseDTO);

    // 창고 위치 삭제
    void deleteWarehouse(int idx);

    List<WarehouseDTO> getWarehouse();


    
}
