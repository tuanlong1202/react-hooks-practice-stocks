import React from "react";
import Stock from "./Stock";

function PortfolioContainer({list,onRemoveFromPortfolio}) {
  const listToDisplay = list.map((item,index)=>{
    return (
      <Stock key={index} stock={item} clickRemoveFromPortfolio={onRemoveFromPortfolio} isStock={false} />
    )
  })
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        //render your portfolio stocks here
        listToDisplay
      }
    </div>
  );
}

export default PortfolioContainer;
