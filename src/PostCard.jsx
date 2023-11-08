import { timeDifference } from './utils';

import useAuth from "./hooks/useAuth";
import axios from "./api/axios";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Nav, Container, Row, Col } from 'react-bootstrap';

import './PostCard.css';

const CreatedWhenInfo = (props) => {
  const {createdAt, createdBy} = props;
  const {days, hours, minutes, seconds} = timeDifference(createdAt);
  if (days > 0) {
    return (
      <small className='text-muted'>{createdBy} • {days} days ago</small>
    );
  } else if (hours > 0) {
    return (
      <small className='text-muted'>{createdBy} • {hours} hours ago</small>
    );
  } else if (minutes > 0) {
    return (
      <small className='text-muted'>{createdBy} • {minutes} minutes ago</small>
    );
  } else if (seconds > 0) {
    return (
      <small className='text-muted'>{createdBy} • {seconds} seconds ago</small>
    );
  } else {
    return (
      <small className='text-muted'>{createdBy} • {seconds} seconds ago</small>
    );
  }
};

const onUpvote = (id) => {
    const { auth } = useAuth();
    const makeRequest = async () => {
        try {
            const response = await axios.post(
                '/api/post/upvote',
                JSON.stringify({'id' : id }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true,
                }
            );
        } catch (e) {
            console.error(e.message);
        }
    };
    return makeRequest;
};

const onDownvote = (id) => {
    const { auth } = useAuth();
    const makeRequest = async () => {
        try {
            const response = await axios.post(
                '/api/post/downvote',
                JSON.stringify({ 'id' : id }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${auth.accessToken}`,
                        'id': id
                    },
                    withCredentials: true,
                }
            );
        } catch (e) {
            console.error(e.message);
        }
    };
    return makeRequest;
};

const onSave = (postId) => {
  const { auth } = useAuth();
  const makeRequest = async () => {
    try {
      await axios.post(
          '/api/post/save',
          JSON.stringify({ 'id' : postId }),
          {
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${auth.accessToken}`,
                  'id': postId,
              },
              withCredentials: true,
          }
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  return makeRequest;
};

const onUnsave = (postId) => {
  const { auth } = useAuth();
  const makeRequest = async () => {
    try {
      await axios.post(
          '/api/post/unsave',
          JSON.stringify({ 'id' : postId }),
          {
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${auth.accessToken}`,
                  'id': postId,
              },
              withCredentials: true,
          }
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  return makeRequest;
};

const PostCard = (props) => {
  const post = props.content;

  return (
      <Card className='my-3 mr-3' style={{width: '50%'}}>


        { /* HEADER */ }
        <Card.Header>
          <CreatedWhenInfo createdAt={post.createdAt} createdBy={post.createdBy}/>        
        </Card.Header>


        { /* BODY */ }
        <Card.Body>
          <Container>
            <Row>
              <Col className='col-1'>
                <Row className='my-1'>
                  {
                    (post.isUpvoted)
                      ? (
                        <button onClick={onUpvote(post.id)} className='shrink-button voted'>
                          <svg id="i-caret-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M30 22 L16 6 2 22 Z" />
                          </svg>
                        </button>
                      )
                      : (
                        <button onClick={onUpvote(post.id)} className='shrink-button unvoted'>
                          <svg id="i-caret-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M30 22 L16 6 2 22 Z" />
                          </svg>
                        </button>
                      )
                  }
                </Row>
                <Row className='mx-auto'>
                  {post.totalVotes}
                </Row>
                <Row>
                  {
                    (post.isDownvoted)
                      ? (
                        <button className="shrink-button voted" onClick={onDownvote(post.id)}>
                          <svg id="i-caret-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                              <path d="M30 10 L16 26 2 10 Z" />
                          </svg>
                        </button>
                      )
                      : (
                        <button className="shrink-button unvoted" onClick={onDownvote(post.id)}>
                          <svg id="i-caret-bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="18" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                              <path d="M30 10 L16 26 2 10 Z" />
                          </svg>
                        </button>
                    )
                  }
                </Row>
              </Col>

              <Col>
                <Card.Title><h5><strong>{post.title}</strong></h5></Card.Title>
                <Card.Text>{post.description}</Card.Text>
              </Col>

            </Row>
          </Container>
        </Card.Body>

        <Card.Footer>
          {
            (post.isSaved)
            ? (
              <Button variant="secondary" onClick={onUnsave(post.id)}>unsave</Button>
            )
            : (
              <Button variant="secondary" onClick={onSave(post.id)}>save</Button>
            )
          }
        </Card.Footer>
      </Card>
  );
};

export default PostCard;