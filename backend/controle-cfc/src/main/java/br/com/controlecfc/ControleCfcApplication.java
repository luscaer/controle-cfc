package br.com.controlecfc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ControleCfcApplication {

	public static void main(String[] args) {
		SpringApplication.run(ControleCfcApplication.class, args);
	}

}
