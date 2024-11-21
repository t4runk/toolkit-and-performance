import React, { Suspense, lazy } from 'react';

const ResourceList = lazy(() => import('./views/ResourceList'));

const App = () => {
  return (
    <div>
      <h1>Resource List</h1>
      <Suspense fallback={<div>Loading Component...</div>}>
        <ResourceList />
      </Suspense>
    </div>
  );
};

export default App;
