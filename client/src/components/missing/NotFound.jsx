import { Link } from 'react-router-dom';
import styles from '../../styles/missing/NotFound.module.css'
import {useEffect} from 'react'

const Missing = () => {
    useEffect(() => {
        document.title = "404 Page Not Found"
    }, [])

    return (
        <main className={styles.notFound}>
            <h2>Page Not Found</h2>
            <p>
                <Link to='/' onClick={() => {if (window.scrollY !== 0) window.scrollTo(0,0)}}>Return to To-Do List</Link>
            </p>
        </main>
    )
}

export default Missing