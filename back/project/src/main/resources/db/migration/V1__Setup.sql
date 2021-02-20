CREATE EXTENSION IF NOT EXISTS pgcrypto;

/* projects are dependent on the existence of an owner (user) */
CREATE TABLE project (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    summary VARCHAR(80) NOT NULL,
    owner_id UUID NOT NULL,
    created DATE NOT NULL
);

/* table holds all collaborators + owner on projects */
CREATE TABLE user_on_project (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    user_id UUID NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE,
    CONSTRAINT unique_user_per_project UNIQUE(project_id, user_id)
);

/* a role is defined on a specific project, it doesn't exist outside of a project */
CREATE TABLE role_on_user (
    user_on_project_id UUID NOT NULL,
    role_id UUID NOT NULL,
    FOREIGN KEY (user_on_project_id) REFERENCES user_on_project (id) ON DELETE CASCADE
);

