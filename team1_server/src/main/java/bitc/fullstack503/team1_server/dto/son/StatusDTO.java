package bitc.fullstack503.team1_server.dto.son;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class StatusDTO
{
  private String image;
  private String name;
  private String warehouseName;
  private String vendorName;
  private String department;
  private String outboundPerson;
  private int beforeQuantity;
  private int afterQuantity;
  private int price;
  @JsonFormat (pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime date;
  private int transaction;
}
