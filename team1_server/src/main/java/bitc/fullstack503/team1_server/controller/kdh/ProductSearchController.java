package bitc.fullstack503.team1_server.controller.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.kdh.ProductSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductSearchController {

  @Autowired
  private ProductSearchService productSearchService;

  @GetMapping("/productSearch")
  public List<ItemDTO> getProductSearchList(){
    return productSearchService.getProductSearchList();
  }

}