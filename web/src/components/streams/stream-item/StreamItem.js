import React from 'react'

import './StreamItem.css';

function StreamItem({ title, thumbnail, views }) {

  const condensedViews = views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views;

  return (
    <div className="d-flex stream-item flex-column">
      <img className='w-100 rounded-1' src={thumbnail} alt={title} />
      <div className="d-flex mt-1 justify-content-between align-items-baseline">
        <h3 className='m-0 fs-4 fw-lighter'>{title}</h3>
        <span className='text-muted views text-end w-100 fw-lighter'>{condensedViews} <i className="fa fa-eye ms-"></i></span>
      </div>
    </div>
  )
}

StreamItem.defaultProps = {
  views: 0
}

export default StreamItem