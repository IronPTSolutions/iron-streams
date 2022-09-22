import React, { useState, useEffect } from 'react';
import * as streamService from '../../../services/stream-service';
import StreamItem from '../stream-item/StreamItem';

function StreamList() {
  const [streams, setStreams] = useState([]);
  
  useEffect(() => {
    streamService.getStreams()
      .then(streams => setStreams(streams))
      .catch(error => console.error(error));
  }, [])

  return (
    <div className="row row-cols-12 row-cols-sm-6 row-cols-md-3">
      {streams.map((stream) => (
        <div className="col" key={stream.id}>
          <StreamItem {...stream} />
        </div>
      ))}
    </div>
  )
}

export default StreamList