import { Link } from 'react-router-dom';

// // TODO: STYLING

const NotFound = () => {
    return (
        <div>
            <div>404</div>
            <div>Page Not Found</div>
            <div>Go to:</div>
            <ul>
                <li><Link to="/community-notes">notes list</Link></li>
                <li><Link to="/create-note">add new note (shortcut)</Link></li>
            </ul>
        </div>
    )
}

export default NotFound;