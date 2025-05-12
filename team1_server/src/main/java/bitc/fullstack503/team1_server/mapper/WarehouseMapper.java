package bitc.fullstack503.team1_server.mapper;

import bitc.fullstack503.team1_server.dto.WarehouseDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WarehouseMapper {
    List<WarehouseDTO> getWarehouseList();

    int getWarehouseItemCount(String warehouseName);

    void insertLocation(WarehouseDTO warehouseDTO);

    void updateLocation( WarehouseDTO warehouseDTO);

    void deleteWarehouse(int idx);

    List<WarehouseDTO> getWarehouse();
}
