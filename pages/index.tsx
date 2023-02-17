// Home page
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'

import Header from '../components/Header/Header' 
import Banner from '../components/Banner' 
import Row from '../components/Row/Row' 
import requests from '../utils/requests'
import { Movie } from '../typings'
import useAuth from '../hooks/useAuth'
import { modalState, movieState } from '../atoms/modalAtom'
import Modal from '../components/Modal'
import Plans from '../components/Plans/Plans'
import payments from '../lib/stripe'
import useSubscription from '../hooks/useSubscription'
import useList from '../hooks/useList'

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
  products: Product[]
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
  products
  }: Props) => {
  
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);  // const [showModal, setShowModal] = useState(false);
  const subscription = useSubscription(user);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  if (loading || subscription === null) return 'null';
  
  // If the user is not subscribed, the subscription plan will be displayed
  if (!subscription) return <Plans products={products}/>;

  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${showModal && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Netflix-Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-20">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Action Movies" movies={actionMovies} />
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
  const products = await getProducts(payments, {
    includePrices: true, 
    activeOnly: true,  // you can delete products in stripe, and they aren't active anymore
  })
    .then((res) => res)
    .catch((err) => console.log(err.message));

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
      products,
    },
  }
}
