import React from 'react';
import UpdateAdminName from './UpdateAdminName';
import DeleteAllFilmsButton from './DeleteAllFilmsButton';

function Admin() {
  return (
    <>
      <UpdateAdminName />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DeleteAllFilmsButton />
      </div>
    </>
  );
}

export default Admin;
