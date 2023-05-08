import { NextPageContext } from "next";
import { signOut, getSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hook/useMovieList";
import useFavorites from "@/hook/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hook/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
