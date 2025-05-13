package bitc.fullstack503.team1_server.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class WarehouseDTO
{
  private int idx;
  private String name;
  private String location;
  private String memo;
}
