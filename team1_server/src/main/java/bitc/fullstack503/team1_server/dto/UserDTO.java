package bitc.fullstack503.team1_server.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserDTO {
    private int idx;
    private String id;
    private String pass;
    private String nickName;
    private String department;
    private int position;
}