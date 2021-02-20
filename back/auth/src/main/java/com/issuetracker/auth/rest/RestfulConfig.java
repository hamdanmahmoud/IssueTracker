package com.issuetracker.auth.rest;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "application.api")
@NoArgsConstructor
@Data
public class RestfulConfig {
    private String projectMicroserviceEndpoint;
    private String accesscontrolMicroserviceEndpoint;
}
