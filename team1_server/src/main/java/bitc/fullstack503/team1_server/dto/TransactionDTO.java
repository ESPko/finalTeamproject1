package bitc.fullstack503.team1_server.dto;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class TransactionDTO
{
  private int idx;
  private int itemIdx;
  private String userId;
  private int transaction;
  private int before;
  private int after;
  private LocalDateTime time;
}
