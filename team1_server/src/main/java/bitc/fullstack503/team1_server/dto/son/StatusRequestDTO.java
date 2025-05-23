package bitc.fullstack503.team1_server.dto.son;
import lombok.Data;

import java.util.List;
@Data
public class StatusRequestDTO
{
  private List<String> tags;
  private List<String> selectedDepartments;
  private List<String> selectedOutboundPerson;
  private String startDate;
  private String endDate;
  private Integer transactionType;
}
