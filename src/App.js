import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}`
    );

    setUsers(response.data.data);
    setLoading(false);
  };

  const changePage = async action => {
    switch (action) {
      case '+':
        setPage(value => value + 1);
        break;
      case '-':
        setPage(value => value - 1);
        break;
      default:
        break;
    }
    await getData();
  };

  useEffect(() => getData(), []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <Fragment>
          <div className="data">
            {users.map(user => (
              <div className="user" key={user.id}>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Email: {user.email}</p>
              </div>
            ))}
          </div>
          <div className="page-control">
            <button onClick={_ => changePage('-')} disabled={page === 1}>
              &lt; Prev Page
            </button>
            <span>{page}</span>
            <button onClick={_ => changePage('+')} disabled={page === 2}>
              &gt; Next Page
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default App;
