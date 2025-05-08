package bitc.fullstack503.team1_server.dto.Login;

import lombok.Data;

@Data
public class LoginRequest {
    private String id;
    private String pass;
}
