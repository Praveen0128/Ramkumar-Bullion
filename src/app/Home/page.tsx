import Coin from '../components/Coin';

const Home = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-scroll hover:animate-none">
        <span className="text-lg text-gray-800">
          Hollow rope, Ketty rope, Square rope, Machine chains, Kerala chains, Handmade chains are available.
        </span>
      </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <section id="home" className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Ramkumar Bullion</h2>
          <p className="text-gray-700">Check out the latest gold and silver rates in Madurai, updated daily!</p>
        </section>

      <Coin />

        
      </main>
    </div>
  );
};

export default Home;
