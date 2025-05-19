package bitc.fullstack503.team1_server.dto.min;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class StockMovementDTO {
    private String date;
    private int stockIn;
    private int stockOut;

}
