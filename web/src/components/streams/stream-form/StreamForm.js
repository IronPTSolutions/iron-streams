import React from 'react';
import { useForm } from 'react-hook-form';
import * as streamsService from '../../../services/stream-service';

function StreamForm() {
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({ mode: 'onTouched' });

  const handleCreateStreamSubmit = (data) => {
    console.log(data);
    streamsService.createStream(data)
      .then(stream => console.log('Todo bien majo', stream))
      .catch(error => {
        if (error.response?.data?.errors) {
          const { errors } = error.response.data;
          console.log(errors);
          Object.keys(error.response.data.errors)
            .forEach((error) => {
              setError(error, {  message: errors[error].message })
            })
        }
      })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateStreamSubmit)}>
      <div className="input-group mb-1">
        <span className="input-group-text"><i className='fa fa-tag fa-fw'></i></span>
        <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} placeholder="Stream title..." 
          {...register('title', { 
            required: 'Title is required', 
            // maxLength: { value: 5, message: 'Title must be <= 100 chars' }
          })} />
        {errors.title && (<div className="invalid-feedback">{errors.title.message}</div>)}
      </div>

      <div className="d-grid mt-2">
        <button className="btn btn-primary" type='submit' disabled={!isValid}>Create Stream</button>
      </div>
    </form>
  )
}

export default StreamForm