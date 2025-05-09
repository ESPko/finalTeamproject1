package bitc.fullstack503.team1_server.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Data
@Getter
@Setter
public class ItemDTO
{
  private int idx;
  private String code;
  private String name;
  private String category;
  private String vendorName;
  private String warehouseName;
  private int quantity;
  private int standard;
  private String qr;
  private int approve;
  private int price;
  private String image;
  private LocalDateTime time;
  private String warehouseLocation;
}
