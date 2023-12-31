import styles from '../../assets/styles/home/Header.module.css'

const Header = ({title}) => {
  return (
    <header id={styles.header}>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
