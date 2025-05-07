package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;

import java.util.List;

public interface WarehouseService {
    List<WarehouseDTO> getWarehouseList();

    int getWarehouseItemCount(String warehouseName);

    void addLocation(WarehouseDTO warehouseDTO);

    void updateLocation(int idx, WarehouseDTO warehouseDTO);
}
