package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.kdh.ProductSearchMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSearchServiceImpl implements ProductSearchService {

  @Autowired
  ProductSearchMapper productSearchMapper;

  @Override
  public List<ItemDTO> getProductSearchList() {
    return productSearchMapper.getProductSearchList();
  }
}