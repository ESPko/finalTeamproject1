package bitc.fullstack503.team1_server.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Data
@Getter
@Setter
public class TransactionDTO
{
  private int idx;
  private int itemIdx;
  private String userId;
  private int transaction; // 0:입고, 1:출고, 2:조정
  private int before;
  private int after;
  private LocalDateTime time;
}
