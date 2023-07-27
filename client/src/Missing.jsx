import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className='missing'>
            <h2>Page Not Found</h2>
            <p className='response'>
                <Link to='/' onClick={() => {if (window.scrollY !== 0) window.scrollTo(0,0)}}>Return to To-Do List</Link>
            </p>
        </main>
    )
}

export default Missing