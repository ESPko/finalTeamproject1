package bitc.fullstack503.team1_server.controller.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.service.kdh.ApproveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApproveController {

  @Autowired
  ApproveService approveService;

  @GetMapping("/approve")
  public List<ItemDTO> getApproveList() {
    return approveService.getApproveList();
  }

  @PutMapping("/updateApprove")
  public ItemDTO updateApprove(@RequestBody ItemDTO item){
    int idx = item.getIdx();
    int approve = item.getApprove();
    approveService.updateApprove(idx,approve);
    return item;

  }

}
