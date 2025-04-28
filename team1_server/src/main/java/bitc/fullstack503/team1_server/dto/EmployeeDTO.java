package bitc.fullstack503.team1_server.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private int userIdx;
    private String userId;
    private String pass;
    private String userName;
    private String addr;
    private String email;
    private String phone;
    private String birthDate;
    private String createDate;
    private String department;
    private int position;
}