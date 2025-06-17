import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// prepared statements ("?"" placeholders) to help prevent SQL injection:
// https://dev.mysql.com/doc/refman/8.4/en/sql-prepared-statements.html

export async function getCommunityNotes() {
  const [rows] = await pool.query("SELECT * from community_member_notes");
  return rows; 
}

export async function getCommunityNote(id) {
    const [user] = await pool.query(`
        SELECT * 
        FROM community_member_notes
        WHERE id = ?
        `, [id]);
    return user[0];
}

export async function createCommunityNote(givenName, surname, notes, email) {
    const [result] = await pool.query(`
        INSERT INTO community_member_notes (given_name, surname, notes, email)
        VALUES (?,?,?,?)`
        , [givenName, surname, notes, email]);
    const id = result.insertId;
    return getCommunityNote(id);
}

export async function editCommunityNote(givenName, surname, notes, email, id) {
    const [result] = await pool.query(`
        UPDATE community_member_notes
        SET given_name = ?, surname = ?, notes = ?, email = ?
        WHERE id = ?`
        , [givenName, surname, notes, email, id]);
    return result;
}

export async function deleteCommunityNote(id) {
    const [result] = await pool.query(`
        DELETE 
        FROM community_member_notes
        WHERE id = ?
        `, [id]);
    // expect affectedRows to === 1 as 1 user has been deleted
    return result.affectedRows;
}
