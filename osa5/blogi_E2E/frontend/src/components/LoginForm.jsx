import NotificationE from './NotificationE'
import NotificationS from './NotificationS'
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
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm