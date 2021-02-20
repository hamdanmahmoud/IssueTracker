CREATE EXTENSION IF NOT EXISTS pgcrypto;

/* a role is always defined on a project */
CREATE TABLE role (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    authority VARCHAR(30) NOT NULL CHECK (upper(authority) = authority),
    project_id UUID NOT NULL,
    CONSTRAINT unique_role_per_project UNIQUE(project_id, authority)
);

/* a role has permissions, each row here links a permission to a role */
CREATE TABLE permission (
    role_id UUID NOT NULL,
    authority VARCHAR(40) NOT NULL CHECK (authority IN (
        'ADMINISTER_ROLES',
        'BE_ASSIGNABLE_TO_ISSUES',
        'ASSIGN_ISSUES',
        'CREATE_ISSUES',
        'CANCEL_ISSUES',
        'EDIT_ISSUES',
        'DELETE_ISSUES',
        'UPDATE_ISSUES_STATUS',
        'MARK_ISSUES_FOR_CLOSURE',
        'CLOSE_ISSUES',
        'VIEW_WATCHERS',
        'ADD_COMMENTS',
        'DELETE_ALL_COMMENTS',
        'DELETE_OWN_COMMENTS',
        'EDIT_ALL_COMMENTS',
        'EDIT_OWN_COMMENTS'
    )),
    UNIQUE(role_id, authority),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);




