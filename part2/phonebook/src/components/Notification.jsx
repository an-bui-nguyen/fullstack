const Notification = (props) => {

    if (props.message === null) {
      return null
    }
  
    return (
      <div className={props.message.type}>
        {props.message.content}
      </div>
    )
  }

export default Notification;