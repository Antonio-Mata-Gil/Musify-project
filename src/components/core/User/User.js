import React, { useContext } from 'react'
import { ApiContext } from '../../../services/Api';
import userImg from '../../../assets/user-icon.png';

const User = () => {

  const { profileApiResponse } = useContext(ApiContext);

  return (
    <div>
        <img src={userImg} alt="user profile img"/>
        <p>{profileApiResponse.display_name}</p>
    </div>
  )
}

export default User;