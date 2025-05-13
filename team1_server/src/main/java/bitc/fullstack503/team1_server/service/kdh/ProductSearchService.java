package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;

public interface ProductSearchService {
  List<ItemDTO> getProductSearchList();
}