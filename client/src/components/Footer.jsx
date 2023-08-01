import styles from '../styles/Footer.module.css'

const Footer = ({length}) => {
  return (
    <footer id={styles.footer}>
      {length === 1 ? <p>1 item.</p> : <p>{length} items.</p>}
    </footer>
  )
}

export default Footer
