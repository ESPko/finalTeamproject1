package bitc.fullstack503.team1_server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
public class Team1ServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(Team1ServerApplication.class, args);
    }
}

