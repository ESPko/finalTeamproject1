package bitc.fullstack503.team1_server.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class ShipmentDetailResponse {

  private String userId;
  private int itemId;
  private String itemName;
  private LocalDateTime releaseDate;
  private int quantity;
  private int releasedQuantity;
  private String warehouseName;
  private String vendorName;
  private String image;

  // 생성자 수정: TransactionDTO를 받지 않고, 직접 값을 받는 생성자로 수정
  public ShipmentDetailResponse(String userId, String itemName, LocalDateTime releaseDate,
                                int quantity, int releasedQuantity, String warehouseName, String vendorName, String image) {
    this.userId = userId;
    this.itemName = itemName;
    this.releaseDate = releaseDate; // LocalDateTime으로 변경
    this.quantity = quantity;
    this.releasedQuantity = releasedQuantity;
    this.warehouseName = warehouseName;
    this.vendorName = vendorName;
    this.image = image;
  }
}
