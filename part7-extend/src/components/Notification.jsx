import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const errorStyle = {
    border: 'solid #FF0000 2px',
    padding: 10,
    marginBottom: '1.5rem'
  }

  const successStyle = {
    border: 'solid #006400 2px',
    padding: 10,
    marginBottom: '1.5rem'
  }

  if (!notification) {
    return <></>
  }

  const determineStyle = () => {
    if (notification.type === 'success') {
      return successStyle
    } else if (notification.type === 'error') {
      return errorStyle
    }
  }

  return (
    <div style={determineStyle()}>
      {notification ? notification.message : ''}
    </div>
  )
}

export default Notification