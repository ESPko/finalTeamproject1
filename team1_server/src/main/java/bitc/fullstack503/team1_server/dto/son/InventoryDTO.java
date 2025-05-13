package bitc.fullstack503.team1_server.dto.son;
import lombok.Data;

import java.util.List;
@Data
public class InventoryDTO
{
  private String image;
  private String name;
  private String warehouseName;
  private String vendorName;
  private int inbound;
  private int outbound;
  private int adjusted;
  private int totalQuantity;
}
