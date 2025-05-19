package bitc.fullstack503.team1_server.service.kms;

import bitc.fullstack503.team1_server.dto.Login.LoginRequest;
import bitc.fullstack503.team1_server.dto.Login.LoginResponse;
import bitc.fullstack503.team1_server.dto.Login.RefreshTokenDTO;
import bitc.fullstack503.team1_server.dto.UserDTO;
import bitc.fullstack503.team1_server.mapper.kms.LoginMapper;
import bitc.fullstack503.team1_server.mapper.kms.RefreshTokenMapper;
import bitc.fullstack503.team1_server.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
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
  public LoginResponse login(LoginRequest request, HttpServletRequest httpRequest) {
    UserDTO user = loginMapper.findByUsername(request.getId());

    if (user != null && user.getPass().equals(request.getPass())) {

      String clientType = httpRequest.getHeader("Client-Type");
      boolean isFlutter = "flutter".equalsIgnoreCase(clientType);

      // React 전용 정책: position == 0 && 부서 != 구매부 로그인 제한
      if (!isFlutter && user.getPosition() == 0 && !"구매부".equals(user.getDepartment())) {
        throw new RuntimeException("접근 권한이 없습니다");
      }

      String accessToken = jwtUtil.generateAccessToken(user.getId());
      String refreshToken = jwtUtil.generateRefreshToken(user.getId());

      // Refresh Token 저장
      RefreshTokenDTO refreshTokenDTO = new RefreshTokenDTO();
      refreshTokenDTO.setUserIdx(user.getIdx());
      refreshTokenDTO.setRefreshToken(refreshToken);
      refreshTokenDTO.setExpiryDate(jwtUtil.getRefreshTokenExpiryDate());
      refreshTokenMapper.saveOrUpdate(refreshTokenDTO);

      return new LoginResponse(accessToken, user);
    }

    throw new RuntimeException("아이디 또는 비밀번호가 올바르지 않습니다");
  }

  @Override
  public UserDTO getUserById(String id) {
    return loginMapper.findByUsername(id);
  }
}
