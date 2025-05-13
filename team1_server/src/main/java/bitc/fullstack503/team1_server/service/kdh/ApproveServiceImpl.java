package bitc.fullstack503.team1_server.service.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import bitc.fullstack503.team1_server.mapper.kdh.ApproveMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApproveServiceImpl implements ApproveService {

  @Autowired
  ApproveMapper approveMapper;

  @Override
  public List<ItemDTO> getApproveList() {
    return approveMapper.getApproveList();
  }

  @Override
  public void updateApprove(int idx, int approve) {
    approveMapper.updateApprove(idx,approve);
  }
}
