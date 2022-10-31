import React from 'react';

function Card({ children }) {
  return (
    <div>
      <div>
        <div className="">
          <div className="border-black border-2 rounded">
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
