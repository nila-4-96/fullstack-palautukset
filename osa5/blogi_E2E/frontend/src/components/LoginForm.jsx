import NotificationE from './NotificationE'
import NotificationS from './NotificationS'
import { Button, TextField } from '@mui/material'
const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  errorMessage,
  successMessage
}) => {
  return (
    <div>
      <NotificationE message={errorMessage} />
      <NotificationS message={successMessage} />
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <TextField
          label='username'
          value={username}
          type="text"
          onChange={handleUsernameChange}
          placeholder='Username'
        />
        <TextField
          label='password'
          value={password}
          type="password"
          onChange={handlePasswordChange}
          placeholder='Password'
        />
        <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm