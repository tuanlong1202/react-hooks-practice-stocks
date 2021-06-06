import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const API = 'http://localhost:3001/stocks';

function MainContainer() {

  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortFilter, setSortFilter] = useState({
                                                  sort:"",
                                                  filter:"",
                                                })

  useEffect(loadData,[]);

  function loadData(){
    fetch(API)
      .then(r=>r.json())
      .then((data)=>{
        setStocks([...data]);
      })
      .catch((e)=>console.error("Error: " + e));
  }

  function handleAddToPortfolio(idValue){
    let pos = portfolio.indexOf(idValue);
    if (pos === -1)
      setPortfolio([...portfolio,idValue]);
  }

  function handleRemoveFromPortfolio(idValue) {
    let pos = portfolio.indexOf(idValue);
    if (pos > -1) {
      portfolio.splice(pos,1);
      setPortfolio([...portfolio]);
    }
  }

  const portfolioList = stocks.filter((item)=>{
    return (portfolio.indexOf(item.id)>=0)
  })

  function handleChange(event){
    setSortFilter({
      ...sortFilter,
      [event.target.name]: event.target.value,
    })
  }

  function sortStocks(){
    if (sortFilter.sort !== "") {
      if (sortFilter.sort === "Price"){
        stocks.sort(function(a,b){
          return a.price - b.price;
        })
      } else if (sortFilter.sort === "Alphabetically"){
        stocks.sort(function(a,b){
          let tickerA = a.ticker.toUpperCase();
          let tickerB = b.ticker.toUpperCase();
          if(tickerA < tickerB){
            return -1;
          }
          if (tickerA > tickerB) {
            return 1;
          }
          return 0;
        })
      }
    }
  }

  sortStocks();

  const listToShow = (sortFilter.filter!=="") 
                      ? stocks.filter(item=>item.type===sortFilter.filter)
                      : stocks;

  return (
    <div>
      <SearchBar change={handleChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            list={listToShow}
            onAddToPortfolio={handleAddToPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            list={portfolioList}
            onRemoveFromPortfolio={handleRemoveFromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
