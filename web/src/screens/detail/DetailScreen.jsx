import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Section } from "../../components";
import {
  commentStream,
  getStream,
  likeStream,
} from "../../services/stream-service";

function DetailScreen() {
  const [stream, setStream] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getStream(id).then((stream) => setStream(stream));
  }, [id]);

  const handleLike = () => {
    likeStream(id).then((data) => {
      setStream({
        ...stream,
        likes: data.likes ? stream.likes + 1 : stream.likes - 1,
      });
    });
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const form = e.target;

    commentStream(id, form.text.value).then((comment) => {
      setStream({
        ...stream,
        comments: [...stream.comments, comment],
      });
    });
  };

  if (!stream) {
    return <></>;
  }

  return (
    <Section title="Detail" icon="wpexplorer">
      <div className="row">
        <div className="col-4">
          <img src={stream.thumbnail} alt="thumbnail" className="w-100" />
        </div>
        <div className="col-8">
          <h5>{stream.title}</h5>
          <p>{stream.description}</p>
          <p>
            <a href={stream.url} target="_blank" rel="noreferrer">
              {stream.url}
            </a>
          </p>
          <p>Category: {stream.category}</p>
          <p>Views: {stream.views}</p>
          <button className="btn btn-danger" onClick={handleLike}>
            <i className="fa fa-heart me-2"></i>
            {stream.likes}
          </button>
        </div>
      </div>

      <hr />

      <h5>Comments</h5>

      <form onSubmit={handleNewComment} className="mb-3">
        <textarea
          name="text"
          className="form-control mb-2"
          placeholder="Add Comment..."
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Comment
        </button>
      </form>

      {stream.comments.map((comment) => (
        <div className="mb-4 border-bottom py-2">
          <p>{comment.text}</p>
          <small>Por {comment.user.name}</small>
        </div>
      ))}
    </Section>
  );
}

export default DetailScreen;
