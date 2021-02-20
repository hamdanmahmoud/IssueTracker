package com.issuetracker.issue.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserOnIssue")
@Table(name = "user_assigned_on_issue")
public class UserAssignedOnIssueEntity implements Serializable {

    private @Id @NotNull UUID userId;
    private @Id @NotNull UUID issueId;

}
