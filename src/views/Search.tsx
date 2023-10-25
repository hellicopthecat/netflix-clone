import {useLocation} from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(keyword);
  return null;
}

// https://api.themoviedb.org/3/search/keyword?query=dune&page=1
// https://api.themoviedb.org/3/search/keword?query=dune&language=ko&region=kr&api_key=659fcb8c58aae2c9fa0ee430456f44bd
// 'https://api.themoviedb.org/3/search/multi?query=dune&include_adult=false&language=ko&api_key=659fcb8c58aae2c9fa0ee430456f44bd
