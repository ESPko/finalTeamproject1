package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;

public interface ItemService {
    List<ItemDTO> getItemList();

    void addItem(ItemDTO itemDTO);
}
