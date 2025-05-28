package bitc.fullstack503.team1_server.controller.son;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping ("/api")
public class ImageController
{
  private static final String BUCKET_NAME = "full503final";
  private static final String SUPABASE_BASE_URL = "https://fcuivpeebbalbbturhuw.supabase.co/storage/v1/object";
  private static final String BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdWl2cGVlYmJhbGJidHVyaHV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzcyNDMyOCwiZXhwIjoyMDYzMzAwMzI4fQ.4h4oxZtATydK8uDoYbgsSc3999qug2Kjy9dWGep1GY8";
  
  @PostMapping ("/upload")
  public ResponseEntity<Map<String, String>> uploadImage (@RequestParam ("image") MultipartFile image)
  {
    try
    {
      // 고유한 파일명 생성
      String originalFilename = image.getOriginalFilename ();
      String uniqueFileName = "image/" + UUID.randomUUID () + "-" + originalFilename;
      String uploadUrl = String.format ("%s/%s/%s", SUPABASE_BASE_URL, BUCKET_NAME, uniqueFileName);
      String publicUrl = String.format ("%s/public/%s/%s", SUPABASE_BASE_URL, BUCKET_NAME, uniqueFileName);
      // Content-Type 확인
      String contentType = image.getContentType ();
      if (contentType == null || contentType.isBlank ())
      {
        contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
      }
      // Header 설정
      HttpHeaders headers = new HttpHeaders ();
      headers.setContentType (MediaType.parseMediaType (contentType));
      headers.setBearerAuth (BEARER_TOKEN);
      headers.add ("Content-Disposition", "inline; filename=\"" + originalFilename + "\"");
      headers.add ("x-upsert", "true");
      // 요청 엔티티 생성
      HttpEntity<byte[]> requestEntity = new HttpEntity<> (image.getBytes (), headers);
      // RestTemplate 요청
      new RestTemplate ().exchange (uploadUrl, HttpMethod.PUT, requestEntity, String.class);
      // 결과 반환
      return ResponseEntity.ok (Map.of ("imageUrl", publicUrl));
    }
    catch (Exception e)
    {
      System.err.println ("이미지 업로드 중 오류 발생: " + e.getMessage ());
      return ResponseEntity.status (HttpStatus.INTERNAL_SERVER_ERROR).build ();
    }
  }
}
