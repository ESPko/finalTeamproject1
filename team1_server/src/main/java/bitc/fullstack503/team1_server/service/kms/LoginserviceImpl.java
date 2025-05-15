package bitc.fullstack503.team1_server.service.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.dto.Login.RefreshTokenDTO;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kms.LoginMapper;
import bitc.fullstack503.team1_server.mapper.kms.RefreshTokenMapper;
import bitc.fullstack503.team1_server.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginserviceImpl implements LoginService {

  @Autowired
  private LoginMapper loginMapper;

  @Autowired
  private JwtUtil jwtUtil;

  @Autowired
  private RefreshTokenMapper refreshTokenMapper;


  @Override
  public LoginResponse login(LoginRequest request) {
    UserDTO user = loginMapper.findByUsername(request.getId());
    if (user != null && user.getPass().equals(request.getPass())) {
      String accessToken = jwtUtil.generateAccessToken(user.getId());
      String refreshToken = jwtUtil.generateRefreshToken(user.getId());

      // ✅ Refresh Token 저장
      RefreshTokenDTO refreshTokenDTO = new RefreshTokenDTO();
      refreshTokenDTO.setUserIdx(user.getIdx());
      refreshTokenDTO.setRefreshToken(refreshToken);
      refreshTokenDTO.setExpiryDate(jwtUtil.getRefreshTokenExpiryDate());
      refreshTokenMapper.saveOrUpdate(refreshTokenDTO);

      // ✅ 응답 객체에 리프레시 토큰도 추가 (필요시 프론트에 전달 가능)
      LoginResponse response = new LoginResponse(accessToken, user);
      return response;
    }

    throw new RuntimeException("Invalid credentials");
  }

  //    직원 관리 페이지 부장만 접근 가능하게 하기 위한 부분
//    승인 목록 페이지 부장만 승인, 거절 버튼 눌러 값 변경 할 수 있게 하기 위한 부분
  @Override
  public UserDTO getUserById(String id) {
    return loginMapper.findByUsername(id);
  }


}
