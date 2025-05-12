package bitc.fullstack503.team1_server.service;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.ItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{

    @Autowired
    private ItemMapper itemMapper;

    @Override
    public List<ItemDTO> getItemList() {
        return itemMapper.getItemList();
    }

    @Override
    public void addItem(ItemDTO itemDTO) {
        itemMapper.insertItem(itemDTO);
    }


}
