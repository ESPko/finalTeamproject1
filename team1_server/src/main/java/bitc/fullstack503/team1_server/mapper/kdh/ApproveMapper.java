package bitc.fullstack503.team1_server.mapper.kdh;

import bitc.fullstack503.team1_server.dto.ItemDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ApproveMapper {
  List<ItemDTO> getApproveList();

  void updateApprove(int idx, int approve);
}
