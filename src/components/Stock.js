import React from "react";

function Stock({stock, clickToPortfolio, clickRemoveFromPortfolio , isStock}) {
  const {id,ticker,name,type,price} = stock;

  function handleClick(){
    (isStock) ? clickToPortfolio(id) : clickRemoveFromPortfolio(id);
  }

  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
