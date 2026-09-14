import { useLoaderData, useNavigate } from "react-router";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { UserContext } from  '../context/UserContext';
import Header from "../components/DetailsComponents/Header";
import BodySection from  '../components/DetailsComponents/BodySection';
import { useContext } from 'react';

function DetailsPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  return (
    <main
      style={{
        backgroundImage: `
    linear-gradient(
        to bottom,
        rgba(0,0,0,0.35),
        rgba(0,0,0,0.85)
    ),
    url(${game.background_image})
`,
      }}
      className="min-h-screen bg-center bg-cover bg-fixed"
    >
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <FaCircleArrowLeft
          className="text-3xl text-white cursor-pointer hover:scale-110 transition mt-6"
          onClick={() => navigate(-1)}
        />
      </div>
      <Header game={game} />

      {profile && <BodySection game={game} profile_id={profile.id}/>}
    </main>
  );
}

export default DetailsPage;
