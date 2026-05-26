import { Alert } from '@mui/material'

const NotificationS = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert style={{ marginTop: 10, marginBottom: 10 }} severity="success">
      {message}
    </Alert>
  ) 
}

export default NotificationS