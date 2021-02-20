CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE issue (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    reporter UUID NOT NULL,
    name VARCHAR(40) NOT NULL,
    description VARCHAR(1200) NOT NULL,
    summary VARCHAR(60) NOT NULL,
    created DATE NOT NULL,
    priority INTEGER NOT NULL CHECK (priority >= 0 AND priority <= 100),
    type VARCHAR(4) NOT NULL CHECK (type IN ('TASK', 'BUG')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDING', 'CANCELED', 'IN_PROGRESS', 'RESOLVED', 'IN_REVIEW', 'TO_DO', 'DONE'))
);

CREATE TABLE user_assigned_on_issue (
    issue_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (issue_id) REFERENCES Issue (id) ON DELETE CASCADE,
    CONSTRAINT user_assigned_only_once_per_issue UNIQUE(issue_id, user_id)
);



