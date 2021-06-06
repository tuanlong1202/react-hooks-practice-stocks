import React from "react";
import Stock from "./Stock";

function StockContainer({list, onAddToPortfolio}) {
  const listToDisplay = list.map((item,index)=>{
    return (
      <Stock key={index} stock={item} clickToPortfolio={onAddToPortfolio} isStock={true} />
    )
  })
  return (
    <div>
      <h2>Stocks</h2>
      {listToDisplay/* render stock list here*/}
    </div>
  );
}

export default StockContainer;
