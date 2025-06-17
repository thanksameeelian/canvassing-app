# Canvassing App

## Setup Steps

### 1. Backend Setup
#### A. Create a `.env` file in the base of the `/server` directory

```
MYSQL_HOST=<IPaddressofMySQLserver>
MYSQL_USER=<yourMySQLuser>
MYSQL_PASSWORD=<yourpassword>
MYSQL_DATABASE='canvassing_app'
```

Developing locally, my MYSQL_HOST is '127.0.0.1' (as 'localhost' can occasionally cause problems).
Your MySQL user must have sufficient permissions to create & manipulate databases. 

**Alternatively** if there are issues with the above setup, there are raw SQL files available in `server/db/raw-SQL` which can be copy & pasted into a running MySQL instance: `schema.sql` for database & table setup and `seed.sql` to seed the table with notes, if desired.

#### B. At base of `/server` directory: `npm install`

#### C. **Either:**
- `npm start` to create MySQL database & db table then start backend with no pre-seeded notes
**or**
- `npm run start:seed` to create the database & a table seeded with several pre-made notes *then* start backend



### 2. Frontend Setup
At base of `/client` directory:
- `npm install`
- `npm start`

## Implementation Notes

- I over-debated whether the EditNote component should redirect to the ViewNote or CommunityNotes component upon submit. While it might well become annoying to return to the note after edit, people often like to review their changes before moving on. In a more fleshed out project, I might try to highlight the changes and have users confirm them rather than follow the pattern I used here, depending on what real users tended to prefer.
