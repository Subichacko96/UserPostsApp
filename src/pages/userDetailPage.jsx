import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function UserDetailPage() {
    const { id } = useParams();
    const [singleUserData, setSingleUserData] = useState(null);
    useEffect(() => {
        axios
          .get(`http://localhost:3001/users/${id}`)
          //.get(`${apiUrl}/users/${id}`)
          .then((res) => setSingleUserData(res.data))
          .catch((err) => console.error("Error fetching user details:", err));
      }, [id]);
    
    return (
        <div style={{ padding: "20px" }}>
            <h2> User Details</h2>
            <ul>
                <li key={singleUserData?.id}>
                    <strong>ID : {singleUserData?.id}</strong> , Name: {singleUserData?.name} ,
                    Gender: {singleUserData?.gender}
                </li>
            </ul>
        </div>
    );
}

export default UserDetailPage;
