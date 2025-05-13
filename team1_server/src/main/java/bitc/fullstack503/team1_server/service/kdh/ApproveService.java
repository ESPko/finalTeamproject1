package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;

import java.util.List;

public interface ApproveService {
  List<ItemDTO> getApproveList();

  void updateApprove(int idx, int approve);
}
