import News from "../../components/news/newsfeed";
import SearchBox from "../../components/search/search";
import NavBar from "../../layouts/NavBar/navbar";

const NewsFeed = () => {
  return (
    <div className="flex">
      <div>
        <NavBar />
      </div>

      <News />

      <SearchBox />
    </div>
  );
};

export default NewsFeed;