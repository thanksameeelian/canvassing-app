import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createConnection(dbConfig);

const seedNotesTable =
`INSERT INTO community_member_notes (given_name, surname, notes, email)
VALUES
('Anne', 'Shirley', 'Joined her in walking a ridge-pole. She expressed conservative views but openness to other opinions.', null),
('Gilbert', 'Blythe', 'Member of Conservative Party but is said to previously identify as liberal. Expressed interest in Empower initiatives if Anne Shirley was going.', 'blytheg@gmail.com'),
('Marilla', 'Cuthbert', 'Stated she eschews politics, but showed underlying interest. Has traveled to attend political speeches', null),
('Matthew', 'Cuthbert', 'Staunch conservative, expressed that being conservative was part of his religion.', 'matthew@yahoo.com'),
('Rachel', 'Lynde', 'Came up to join ongoing conversation with Matthew Cuthbert. Identifies as liberal. Expressed interest in attending events for any political persuasion as long as her neighbors would be there.', null);`

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected!');


    connection.query(seedNotesTable, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
        } else {
            console.log('Query executed successfully: seed community_member_notes table');
        }
    });


    connection.end();
});
