import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResources } from '../redux/slices/resourceSlice';
import { createSelector } from '@reduxjs/toolkit';

const selectResources = createSelector(
  (state) => state.resource.resources,
  (resources) => resources // No filter, since API handles pagination
);

const ResourceList = () => {
  const dispatch = useDispatch();

  const resources = useSelector(selectResources);
  const status = useSelector((state) => state.resource.status);
  const error = useSelector((state) => state.resource.error);
  const currentPage = useSelector((state) => state.resource.currentPage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResources(currentPage));
    }
  }, [status, dispatch, currentPage]);

  const handleNext = () => {
    dispatch(fetchResources(currentPage + 1));
  };

  const handleBack = () => {
    if (currentPage > 1) {
      dispatch(fetchResources(currentPage - 1));
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Paginated Resource List</h1>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>{resource.title}</li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleBack} disabled={currentPage === 1}>
          Back
        </button>
        <button onClick={handleNext} style={{ marginLeft: '10px' }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ResourceList;
