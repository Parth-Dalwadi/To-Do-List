const Footer = ({length}) => {
  return (
    <footer>
      {length === 1 ? <p>1 item.</p> : <p>{length} items.</p>}
    </footer>
  )
}

export default Footer
