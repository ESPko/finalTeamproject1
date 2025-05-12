package bitc.fullstack503.team1_server.dto.song;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceiveItemRequest {
  private Integer quantity;      // 입고 수량
  private String receivedDate;   // 입고 날짜
  private String memo;           // 메모
}
