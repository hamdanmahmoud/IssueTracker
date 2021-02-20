package com.issuetracker.project;

import com.issuetracker.project.service.RestfulBearerExchangeFilterFunction;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class ProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	@Bean
	public WebClient rest() {
		return WebClient.builder()
				.filter(new RestfulBearerExchangeFilterFunction())
				.build();
	}
}
