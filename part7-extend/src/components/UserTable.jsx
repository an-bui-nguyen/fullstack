import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserTable = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>User</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable