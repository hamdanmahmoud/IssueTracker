CREATE EXTENSION IF NOT EXISTS pgcrypto;

/*
    user existence is completely independent of all other entities
    because a user can exist regardless if any project, issue or role
    exist
*/
CREATE TABLE app_user (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    mail VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    title VARCHAR(30),
    description VARCHAR(200),
    picture TEXT,
    CONSTRAINT unique_mail UNIQUE(mail)
);

