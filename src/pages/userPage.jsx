import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState();
    const [userGender, setUserGender] = useState();


    const fetAllUsers = () => {
        //get user
        axios
            // .get("http://localhost:3001/users")
            .get(`${apiUrl}/users`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    }

    useEffect(() => {
        fetAllUsers();
        //post users   

    }, []);
    const AddNewUser = () => {
        axios
            //.post("http://localhost:3001/users", { name: userDetails, gender: userGender })
            .post(`${apiUrl}/users`, { name: userDetails, gender: userGender })
            .then(() => {
                setUserDetails("")
                fetAllUsers();
            })
    }

    return (
        <div>
                <h3>Add User Details</h3>
            <input type="text" value={userDetails} placeholder="Enter User name" onChange={(event) => setUserDetails(event.target.value)} />
            <div>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={userGender === "male"}
                        onChange={(e) => setUserGender(e.target.value)}
                    />
                    Male
                </label>
                <label style={{ marginLeft: "10px" }}>
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={userGender === "female"}
                        onChange={(e) => setUserGender(e.target.value)}
                    />
                    Female
                </label>
            </div>
            <button style={{ color: "green",margin:"10px" }} onClick={() => AddNewUser()}>Add New User</button>
            <h2 className="mt-5">Users</h2>
            <ul>
                {users.map((u) => (
                        <li key={u.id} >{u.name}
                        <Link to={`/users/${u.id}`}>
                            <button style={{margin:"15px",color:"blueviolet",backgroundColor:"white",borderRadius:"3px",width:"50px"}}>View</button>
                        </Link></li>   
                ))}
            </ul>
        
        </div>
    );
}

export default UsersPage;
