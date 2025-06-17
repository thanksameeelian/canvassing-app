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


#### B. At base of `/server` directory: 
- `npm install`


#### C. **Either:**
- `npm start` to create MySQL database + db table and start backend with no pre-seeded notes

**or**

- `npm run start:seed` to create the database + db table seeded with several pre-made notes and start backend  

***or***

If there are issues with the above setup, there are raw SQL files available in `server/db/raw-SQL` which can be copy & pasted into a running MySQL instance: `schema.sql` for database & table setup and `seed.sql` to seed the table with notes, if desired.

### 2. Frontend Setup
At base of `/client` directory:
- `npm install`
- `npm start`  



## Implementation Notes
### General
- I did not use AI tools to aid in the creation of this project, but I did do typical web searching for documentation (+ the examples & playgrounds within it) and syntax, etc. Seeing the time, I tried to coax Github Copilot to write some tests but unfortunately it ended up being a timesuck after I was already out of allotted time.

- Speaking of which, I really wish I could've implemented tests. I'd hoped to use PrimeReact for nice theming, form components, and a sortable & searchable table of notes, but because I hadn't used it recently, implementation of those UI elements took longer than I expected, and I was only able to fully implement the sortable & searchable table. If I could go back in time, I definitely would've implemented tests first, even if they were rudimentary ones.

- I debated using a build tool like Vite or a framework like NextJS for this project, but ultimately did not because I wanted to match the project specifications as closely as possible.

- I hoped to build out more robust and descriptive error handling that surfaced more information to the user but unfortunately can out of time. 

### Frontend
- I ended up using (deprecated) create-react-app without a framework due to the concerns I mentioned above about matching the project specifications, but also for simplicity, expediency, and because of the limited purposes of this take-home project. In a production environment however, I would use a framework to build a highly performant app.

- I would've loved to make this beautiful! And especially beautiful on mobile, as that's how I imagined this app primarily being used in the field.

#### Components

- I had the idea of including ViewNotes in case notes were very long and cut off by a planned overflow setting on the notes table, and hoped to add more complex functionality to it that would've reduced the amount of overlap between the table, the view component, and the edit component, but unfortunately couldn't expand it within the time allotted.
 
- I over-debated whether the EditNote component should redirect to the ViewNote or CommunityNotes component upon submit. While it might well become annoying to return to the note after edit, people often like to review their changes before moving on. In a more fleshed out project, I might try to highlight the changes and have users confirm them rather than follow the pattern I used here, depending on what real users tended to prefer.

#### Routing 

- I chose declarative routing mode in React Router because of the relatively simple content and paths for this sample project.

- I hoped to make an additional route & component with large buttons for "Add Note" and "See Table" because I've seen canvassers with tablets who needed to quickly and easily toggle back and forth, but I didn't have extra time and didn't want to create even more unnecessarily overlapping functionality when I wasn't able to build out the original components to my satisfaction.

#### Table
- I really wish I'd had the chance to make it prettier! At least it should be functional though.

- In a production case, I would likely implement table pagination to accommodate very large datasets, but I did not in this case primarily because I simply didn't have the time, but also because of common issues with correctly sorting paginated data in full (rather than just the information presently visible on the particular page). I might theoretically implement lazy loading/infinite scroll instead, but it depends on many factors including the expected size of the dataset.

- I intentionally made the table sortable by multiple columns at once (usable via the "command" key + mouse clicks), but didn't have time to include succinct UX writing to explain it.

#### Forms
- I really wanted to include form validation and surface errors to users (i.e. specific fields can't be null), but ran out of time.

- I also really wish they could be prettier - I selected PrimeReact specifically because they had both the table and form features/components that would perfectly serve my purpose, but unfortunately couldn't implement what I'd planned.

- If I'd had more time or planned to include both CreateNote & EditNote at the outset, I would've created a separate form component (or collection of components) in a dedicated forms directory. The form could've taken in props from the Note components for button labels, etc.

- Depending on the use-case for these canvassing notes, I would include more contact details (e.g. phone number) and include checkboxes for each on the form to indicate "can contact" for each method and a db column (singular “can contact” containing JSON that specifies true/false for both email and phone or 2 columns, 1 for each method)

- I wanted to include an "Anonymous" toggle on the create form that would auto-fill "Given name" & "Surname" as "Community" & "Member," but didn't have the time, wasn't sure if there was a specific use-case for it, and thought it would look a bit weird if someone only wanted to provide either first or last name (e.g. "Amelia Member," "Community Breault" ...ultimately a little too weird)

- I wanted to include an optional "Time" input in the create/edit form (currently it's filled by default to the current time on the backend) to allow for users to enter in notes after the fact but assign them to the correct day. I planned to adjust the database field to be YYYY-MM-DD (without time, as it currently is) to have a smooth user experience that did not call upon the user to set a specific hour & minute (or set all manual entries arbitratily to midnight or similar), but ultimately ran out of ***time*** to implement it on both the front- and backends (and there are a lot of other things I would've implemented first).

### Backend
- I intended to implement Prisma to improve dev experience and streamline database setup & seeding, but didn't end up having time.

- I debated whether to make `MYSQL_DB_TABLE` an additional variable within the `.env` file in order to make table naming more flexible/customizable, then carry that through `database.js` and the `createDB.js` & `seedDB.js` scripts as a template literal, but thought that if the project theoretically expanded that potential `.env` variable might create room for confusion as the `.env` file grew to be used for multiple purposes.

- I used simplified responses for db name columns due to time constraints on this particular project, but in the real world I'd try to consider a fuller picture of how people’s names are structured in different cultures and adjust column names, form content, etc. It would also be great to have optional fields like "preferred name" if we intended to have future contact with those community members.

- *(repeat from "Frontend" section)* Depending on the use-case for these canvassing notes, I would include more contact details (e.g. phone number) and include checkboxes for each on the form to indicate "can contact" for each method and a db column (singular “can contact” containing JSON that specifies true/false for both email and phone or 2 columns, 1 for each method)

----


# Thanks for reading!