package com.issuetracker.auth.jwt;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class AuthenticationRequestBody {
    private String username;
    private String password;
}
