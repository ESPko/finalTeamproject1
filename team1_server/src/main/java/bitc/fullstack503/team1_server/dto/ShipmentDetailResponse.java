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

  // warehouseLocation 필드 추가
  private String warehouseLocation;

  // 생성자 수정: warehouseLocation을 받는 생성자 추가
  public ShipmentDetailResponse(String userId, String itemName, LocalDateTime releaseDate,
                                int quantity, int releasedQuantity, String warehouseName,
                                String vendorName, String image, String warehouseLocation) {
    this.userId = userId;
    this.itemName = itemName;
    this.releaseDate = releaseDate; // LocalDateTime으로 변경
    this.quantity = quantity;
    this.releasedQuantity = releasedQuantity;
    this.warehouseName = warehouseName;
    this.vendorName = vendorName;
    this.image = image;
    this.warehouseLocation = warehouseLocation; // warehouseLocation 추가
  }

  // 기본 생성자 (옵션)
  public ShipmentDetailResponse() {
    // 기본값으로 초기화 가능 (필요시)
  }
}
