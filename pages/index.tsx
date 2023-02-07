// Home page
import Head from 'next/head'
import { useRecoilValue } from 'recoil'

import Header from '../components/Header' 
import Banner from '../components/Banner' 
import Row from '../components/Row/Row' 
import requests from '../utils/requests'
import { Movie } from '../typings'
import useAuth from '../hooks/useAuth'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'

interface Props { 
  netflixOriginals: Movie[]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  MusicMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  fantasyMovies: Movie[]
 }

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  fantasyMovies,
  MusicMovies,
  romanceMovies,
  topRated,
  trendingNow, 
  }: Props) => {
  
  const { loading } = useAuth();
  const showModal = useRecoilValue(modalState);  // const [showModal, setShowModal] = useState(false);

  if (loading) return 'null'

  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <Head>
        <title>Netflix-Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-20">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
          {/* My List Components */}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Music Movies" movies={MusicMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
          <Row title="Fantasy Movies" movies={fantasyMovies} />
        </section>
      </main>
      {/* Modal */}
      { showModal && <Modal /> }
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    MusicMovies,
    romanceMovies,
    documentaries,
    fantasyMovies,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchMusicMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchFantasyMovies).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      MusicMovies: MusicMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      fantasyMovies: fantasyMovies.results,
    },
  }
}
