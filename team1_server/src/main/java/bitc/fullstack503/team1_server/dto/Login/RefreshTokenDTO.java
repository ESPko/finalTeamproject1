package bitc.fullstack503.team1_server.dto.Login;

import lombok.Data;

import java.util.Date;

@Data
public class RefreshTokenDTO {
    private int userIdx;
    private String refreshToken;
    private Date expiryDate;
}
