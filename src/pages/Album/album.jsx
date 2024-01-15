import AlbumCard from "../../components/Album Card/AlbumCard";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";

const Album = () => {
  return (
    <div className="flex w-full">
      <AlbumCard />
      <UserProfileCard />
    </div>
  );
};

export default Album;
