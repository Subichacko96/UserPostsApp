import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState();
    const [userGender, setUserGender] = useState();
    const [isUpdateUser, setIsUpdateUser] = useState(false);
    const [singleUserData, setSingleUserData] = useState(null);
    const [userid, setuserId] = useState(null);

    const fetAllUsers = () => {
        //get user
        axios
            .get("http://localhost:3001/users")
            //.get(`${apiUrl}/users`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    }

    useEffect(() => {
        fetAllUsers();
        //post users   

    }, []);
    const AddNewUser = () => {
        axios
            .post("http://localhost:3001/users", { name: userDetails, gender: userGender })
            //.post(`${apiUrl}/users`, { name: userDetails, gender: userGender })
            .then(() => {
                setUserDetails("")
                fetAllUsers();
            })
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then((res) => {
                console.log("User deleted successfully", res.data);
                fetAllUsers();
            })
            .catch((err) => {
                console.error("Error deleting user", err);
            });
    }
    const viewUser = (id) => {
        setIsUpdateUser(true);
        fetchUserById(id)
        setuserId(id)
    }

    const updateUser = () => {

        const updatedUser = {
            name: userDetails,
            gender: userGender,
        };

        axios.put(`http://localhost:3001/users/${userid}`, updatedUser)
            .then(response => {
                console.log("User updated successfully:", response.data);
                setIsUpdateUser(false);
                fetAllUsers();
                setUserDetails("");
                setUserGender("");
            })
            .catch(error => {
                console.error("Error updating user:", error);
            });
    }
    const fetchUserById = (id) => {
        axios
            .get(`http://localhost:3001/users/${id}`)
            .then((res) => {
                setSingleUserData(res.data);
                setUserDetails(res.data.name);      // set input value state here
                setUserGender(res.data.gender);    // set gender state here
            })
            .catch((err) => console.error("Error fetching user details:", err));
    };

    return (
        <div>

            {!isUpdateUser && <>
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
                <button style={{ color: "green", margin: "10px" }} onClick={() => AddNewUser()}>Add New User</button>
            </>}
            {isUpdateUser && <>
                <h3>Update User Details</h3>
                {/* <input type="text" value={singleUserData?.name} placeholder="Enter User name" onChange={(event) => setUserDetails(event.target.value)} /> */}
                <input
                    type="text"
                    value={userDetails || ""}
                    placeholder="Enter User name"
                    onChange={(event) => setUserDetails(event.target.value)}
                />

                <div>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={userGender === "male"}
                            onChange={(e) => setUserGender(e.target.value)}
                        /> Male
                    </label>
                    <label>
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
                <button style={{ color: "green", margin: "10px" }} onClick={() => updateUser()}>Update User</button>
            </>}

            <h2 className="mt-5">Users</h2>
            <ul>
                {users.map((u) => (
                    <li key={u.id} >{u.name}
                        <Link to={`/users/${u.id}`}>
                            <button style={{ margin: "15px", color: "blueviolet", backgroundColor: "white", borderRadius: "3px", width: "50px" }}>View</button>
                        </Link>
                        <button style={{ margin: "15px", color: "orange", backgroundColor: "white", borderRadius: "3px", width: "50px" }} onClick={() => viewUser(u.id)}>Edit</button>
                        <button style={{ margin: "15px", color: "white", backgroundColor: "red", borderRadius: "3px", width: "50px" }} onClick={() => deleteUser(u.id)}>Delete</button></li>
                ))}
            </ul>

        </div>
    );
}

export default UsersPage;
