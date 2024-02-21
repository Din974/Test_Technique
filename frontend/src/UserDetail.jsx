import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/UserDetail.css';

function UserDetail() {
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur depuis les paramètres d'URL

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const userData = await response.json();
        setUser(userData);

        const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail-container">
      <h2 className="user-detail-title">{user.username}'s Page</h2>
      <p className="user-detail-info">Name: {user.name}</p>
      <p className="user-detail-info">Username: {user.username}</p>
      <p className="user-detail-info">Email: {user.email}</p>

      <div className="user-detail-albums">
        <h3 className="user-detail-albums-title">Albums:</h3>
        <ul className="user-detail-albums-list">
          {albums.map(album => (
            <li key={album.id} className="user-detail-albums-item">
              <Link to={`/album/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/user-list`} className="user-detail-back-link">Back to User List</Link>
    </div>
  );
}

export default UserDetail;
