const Footer = (props) => {
    return (
      <h4>Number of exercises {props.content.reduce((sum, item) => {return sum + item.exercises}, 0)}</h4>
    )
  }

export default Footer;