import React, { useEffect, useState } from "react";
import PFsearch from "./PFsearch";
import { getBigcate } from "../../api/portfolioAxios";

const PortfolioSection = () => {
  const [search, setSearch] = useState();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getBigcate(setCategory);
  }, []);
  return (
    <div>
      <PFsearch search={search} category={category} setCategory={setCategory} />
      <portfolioContent />
    </div>
  );
};

export default PortfolioSection;
