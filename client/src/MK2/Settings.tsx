import '../MK2/settings.css';

import {
  useEffect,
  useState,
} from 'react';

import deleteIcon from '../assets/delete.png';
import logo from '../assets/Tiei logo.png';

interface UserDetailsProps {
  onClose?: () => void;
  username?: string;
  logout: () => void;
  usertype: string;
}

interface UserRow {
  id: number;
  username: string;
  userid: string;
  usertype: string;
}

       
export default function UserDetails({ logout, username: loggedInUsername }: UserDetailsProps) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<UserRow[]>([]);
  const [toast, setToast] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [newUsername, setNewUsername] = useState(""); 
  const [newUserType, setNewUserType] = useState("USER");

  const resolvedUsername =
  loggedInUsername || localStorage.getItem("authUser") || "";

  const showToast = (msg: string, type: "success" | "error" = "error") => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(""), 2500);
  };

  const refreshUsers = () => {
    fetch("http://192.168.0.24:4002/api/mk2_users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const addUser = () => {
    if (users.some((u) => u.username === newUsername)) {
      showToast("Username already exists", "error");
      return;
    }

    const payload = { username: newUsername, userid, usertype: newUserType, password };

    fetch("http://192.168.0.24:4002/api/users/mk2_add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          showToast(data.message, "error");
          return;
        }

        refreshUsers();
        setNewUsername("");
        setUserid("");
        setPassword("");
        setNewUserType("USER");

        showToast("User created successfully", "success");
      });
  };

  const deleteUser = (id: number) => {
    fetch(`http://192.168.0.24:4002/api/users/mk2_delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      refreshUsers();
      showToast("User deleted", "success");
    });
  };

  return (
    <div className="settings-container">
      <header className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="App Logo" className="topbar-logo" role="presentation"
  tabIndex={-1} onClick={() => window.open("https://tiei.toyota-industries.com/", "_blank")} />
          <span className="topbar-title" style={{ marginLeft: '630px' }}>⚙️SETTINGS</span>
        </div>
        <div className="topbar-right">
          <button className="logout-btn" onClick={logout}>LogOut</button>
        </div>
      </header>

      <div className="settings-content">
   
       <h6>👋 Welcome, {resolvedUsername}!</h6>

        <div className="settings-section">
          <div className="overlay-bg">
            <div className="overlay-card">
              <div className="overlay-header">
                <h2>USER DETAILS</h2>
              </div>

              <div className="overlay-body">
                <div className="left-form">
                  <h3>Create New User</h3>

                  <select value={newUserType} onChange={(e) => setNewUserType(e.target.value)}>
                    <option value="SUPER ADMIN">SUPER ADMIN</option>
                    <option value="USER">USER</option>
                  </select>

                  <input type="text" placeholder="Username"
                    value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />

                  <input type="text" placeholder="User ID"
                    value={userid} onChange={(e) => setUserid(e.target.value)} />

                  <input type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                  <button className="create-btn" onClick={addUser}>
                    Create User
                  </button>
                </div>

                <div className="right-table">
                  <h3>Existing Users</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Sl. No</th>
                        <th>Username</th>
                        <th>User ID</th>
                        <th>User Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users.map((u, index) => (
                        <tr key={u.id}>
                          <td>{index + 1}</td>
                          <td>{u.username}</td>
                          <td>{u.userid}</td>
                          <td>{u.usertype}</td>
                          <td>
                            <img
                              src={deleteIcon}
                              alt="delete"
                              className="delete-icon"
                              role="presentation" tabIndex={-1}
                              onClick={() => deleteUser(u.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

              </div>
            </div>

            {toast && (
              <div className={`toast ${toastType === "success" ? "toast-success" : "toast-error"}`}>
                {toast}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
