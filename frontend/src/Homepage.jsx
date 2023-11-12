import NavigationBar from './Navbar';
import './Homepage.css';
import './common.css';

import { useState, useEffect } from 'react';
import axios from './api/axios';
import PostCard from './PostCard';
import useAuth from './hooks/useAuth';

const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = (auth.accessToken)
          ? await axios.get('/api/post/fetch_all',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            }
          )
          : await axios.get('/api/public/posts');
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data.map((item) => (
            <PostCard content={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

const Homepage = () => {
  return (
    <div>
      <NavigationBar />
      <Posts />
    </div>
  );
}

export default Homepage;
