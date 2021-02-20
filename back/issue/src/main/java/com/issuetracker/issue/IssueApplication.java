package com.issuetracker.issue;

import com.issuetracker.issue.service.RestfulBearerExchangeFilterFunction;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class IssueApplication {

	public static void main(String[] args) {
		SpringApplication.run(IssueApplication.class, args);
	}

	@Bean
	public WebClient rest() {
		return WebClient.builder()
				.filter(new RestfulBearerExchangeFilterFunction())
				.build();
	}
}
