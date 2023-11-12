import { useEffect, useState } from "react";
import NavigationBar from "./Navbar";
import PostCard from "./PostCard";
import axios from "./api/axios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container } from "react-bootstrap";
import useAuth from "./hooks/useAuth";

const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
            '/api/post',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            }
        );
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
          (data.length == 0)
            ? (
              <Container> You have no created posts </Container>
            )
            : (
              <ul>
                {data.map((item) => (
                  <PostCard content={item} />
                ))}
              </ul>
            )
      )}
    </div>
  );
};

const Saved = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
      const fetchSavedPosts = async () => {
        try {
          const response = await axios.get(
              '/api/post/fetch_saved',
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': `Bearer ${auth.accessToken}`
                  },
                  withCredentials: true,
              }
          );
          setData(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchSavedPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        (data.length == 0)
        ? (
          <Container> You have no saved posts </Container>
        )
        : (
          <ul>
            {data.map((item) => (
              <PostCard content={item} />
            ))}
          </ul>
        )
      )}
    </div>
  );
};

const Upvoted = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
      const fetchSavedPosts = async () => {
        try {
          const response = await axios.get(
              '/api/post/fetch_upvoted',
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': `Bearer ${auth.accessToken}`
                  },
                  withCredentials: true,
              }
          );
          setData(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchSavedPosts();
  }, []);

  if (data.length == 0) {
    return (
      <Container>
        You have no saved posts
      </Container>
    )
  } else {
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          (data.length == 0)
            ? (
              <Container> You have no upvoted posts </Container>
            )
            : (
              <ul>
                {data.map((item) => (
                  <PostCard content={item} />
                ))}
              </ul>
            )
        )}
      </div>
    );
  }
};

const Downvoted = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
      const fetchSavedPosts = async () => {
        try {
          const response = await axios.get(
              '/api/post/fetch_downvoted',
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'authorization': `Bearer ${auth.accessToken}`
                  },
                  withCredentials: true,
              }
          );
          setData(response.data);
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      };
      fetchSavedPosts();
  }, []);

  if (data.length == 0) {
    return (
      <Container>
        You have no saved posts
      </Container>
    )
  } else {
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          (data.length == 0)
            ? (
              <Container> You have no downvoted posts </Container>
            )
            : (
              <ul>
                {data.map((item) => (
                  <PostCard content={item} />
                ))}
              </ul>
            )
        )}
      </div>
    );
  }
};

const Dashboard = () => {
  const [key, setKey] = useState('posts');

  return (
    <Container className="mx-auto mt-3">
        <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="ml-3"
        >
        <Tab eventKey="posts" title="Posts">
            <Posts />
        </Tab>
        <Tab eventKey="saved" title="Saved">
            <Saved />
        </Tab>
        <Tab eventKey="upvoted" title="Upvoted">
            <Upvoted />
        </Tab>
        <Tab eventKey="downvoted" title="Downvoted">
            <Downvoted />
        </Tab>
        </Tabs>
    </Container>
  );
}

const ProfilePage = () => {
    return (
        <>
            <NavigationBar />
            <Dashboard />
        </>
    )
};

export default ProfilePage;
