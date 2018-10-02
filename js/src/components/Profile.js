import React from 'react';

const Profile = () => {
    return (
        <div>
            <p>Profile</p>
            <p>User name: {sessionStorage.getItem("userName")}</p>
        </div>
    )
}

export default Profile;