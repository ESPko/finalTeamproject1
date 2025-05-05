package bitc.fullstack503.team1_server.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String id;
    private String pass;
}
