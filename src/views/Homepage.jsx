import { useLoaderData } from "react-router";
import GameList from "../components/HomeComponents/GameList";
import HeaderHome from '../components/HomeComponents/HeaderHome';

function Homepage() {
  const games = useLoaderData();

  return (
    <>
      <HeaderHome games={games}/>

      <GameList>
        {games.map((game) => {
          return <GameList.Card key={game.id} game={game} />;
        })}
      </GameList>
    </>
  );
}

export default Homepage;
