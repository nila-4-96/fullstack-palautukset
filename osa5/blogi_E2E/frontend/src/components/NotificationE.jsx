import { Alert } from '@mui/material'

const NotificationE = ({ message }) => {
  if (message === null) {
    return null
  }

  // return <div className="error">{message}</div>
  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity="error">
      {message}
    </Alert>
  )
}

export default NotificationE