import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/Constants';
import { useParams } from 'react-router';
import UserMiniCard from '../../Components/UserCard/UserMiniCard';

const EmptyFollowersList = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      Till now No one follows you. :( Tell your friends to follow you
    </div>
  );
};

function Followers() {
  const { username } = useParams();

  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/account/${username}/followers`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setFollowers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ margin: '4rem 15rem' }}>
      {followers && followers.length > 0 ? (
        followers.map((f) => <UserMiniCard userData={f} />)
      ) : (
        <EmptyFollowersList />
      )}
    </div>
  );
}

export default Followers;
