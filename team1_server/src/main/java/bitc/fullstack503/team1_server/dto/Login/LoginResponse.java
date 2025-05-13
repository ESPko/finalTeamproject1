package bitc.fullstack503.team1_server.dto.Login;

import bitc.fullstack503.team1_server.dto.UserDTO;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private UserDTO user;

    public LoginResponse(String token, UserDTO user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "LoginResponse{" +
          "token='" + token + '\'' +
          ", user=" + user +
          '}';
    }
}
