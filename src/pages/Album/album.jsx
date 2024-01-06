import AlbumCard from "../../components/Album Card/AlbumCard";
import SearchBox from "../../components/search/search";

const Album = () => {
  return (
    <div className="flex w-full">
      <AlbumCard />
      <SearchBox />
    </div>
  );
};

export default Album;
