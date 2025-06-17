CREATE DATABASE canvassing_app;
USE canvassing_app;

CREATE TABLE community_member_notes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    given_name VARCHAR(50) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    notes VARCHAR(1000) NULL,
    email VARCHAR(254) NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW() 
);
