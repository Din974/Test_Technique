import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/AlbumDetail.css';

function AlbumDetail() {
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const { albumId } = useParams(); // Get the album ID from the URL parameters

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        // Fetch album data
        const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
        const albumData = await albumResponse.json();
        setAlbum(albumData);

        // Fetch photos associated with the album
        const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photosData = await photosResponse.json();
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div className="album-detail-container">
      <h2 className="album-detail-title">Title : {album.title}</h2>
      <div className="album-detail-photos">
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="album-detail-photo"
          />
        ))}
      </div>
      <Link to={`/user/${album.userId}`} className="album-detail-back-link">Back to User</Link>
    </div>
  );
}

export default AlbumDetail;
