package bitc.fullstack503.team1_server.mapper.kms;

import bitc.fullstack503.team1_server.dto.Login.RefreshTokenDTO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface RefreshTokenMapper {

    @Insert("INSERT INTO refresh_token (user_idx, refresh_token, expiry_date) VALUES (#{userIdx}, #{refreshToken}, #{expiryDate}) " +
            "ON DUPLICATE KEY UPDATE refresh_token = #{refreshToken}, expiry_date = #{expiryDate}")
    void saveOrUpdate(RefreshTokenDTO refreshTokenDTO);

    @Select("SELECT * FROM refresh_token WHERE refresh_token = #{refreshToken}")
    RefreshTokenDTO findByToken(String refreshToken);

    @Delete("DELETE FROM refresh_token WHERE refresh_token = #{refreshToken}")
    void deleteByToken(String refreshToken);
}