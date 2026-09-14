import FavouriteButton from "./FavouriteButton";
import Reviews from './Reviews';
function BodySection({ game, profile_id }) {
  

  return (
    <>
    <FavouriteButton 
    game={game}
    profile_id={profile_id}
    />

      <Reviews 
      game={game}
      profile_id={profile_id}
      />
    </>
  );
}

export default BodySection;
