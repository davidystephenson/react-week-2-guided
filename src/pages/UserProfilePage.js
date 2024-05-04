import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const UserProfilePage = () => {
  const storedUser = sessionStorage.getItem('loggedInUser')
  const loggedInUser = JSON.parse(storedUser)
  const [email, setEmail] = useState(loggedInUser.email)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState(loggedInUser.username)
  function handleEmailChange (event) {
    setEmail(event.target.value)
  }
  function handlePasswordChange (event) {
    setPassword(event.target.value)
  }
  function handleUsernameChange (event) {
    setUsername(event.target.value)
  }
  function handleUpdate (event) {
    event.preventDefault()

    const localCredentials = localStorage.getItem('credentials')
    const credentials = JSON.parse(localCredentials)
    console.log('loggedInUser.username', loggedInUser.username)
    console.log('credentials before', credentials)
    delete credentials[loggedInUser.username]
    console.log('credentials after', credentials)
    credentials[username] = password
    const credentialsString = JSON.stringify(credentials)
    localStorage.setItem('credentials', credentialsString)

    const localUsers = localStorage.getItem('users')
    let users = JSON.parse(localUsers)
    users = users.filter(user => user.username !== loggedInUser.username)

    loggedInUser.email = email
    loggedInUser.password = password
    loggedInUser.username = username
    users.push(loggedInUser)

    const usersString = JSON.stringify(users)
    localStorage.setItem('users', usersString)

    const userString = JSON.stringify(loggedInUser)
    sessionStorage.setItem('loggedInUser', userString)
  }
  return (
    <>
      <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleEmailChange}
            value={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePasswordChange}
            value={password}
            type='password'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleUsernameChange}
            value={username}
          />
        </Form.Group>
        <Button type='submit'>
          Update
        </Button>
      </Form>
    </>
  )
};

export default UserProfilePage;
