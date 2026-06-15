export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center text-center px-4">
      <div>
        <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-4">Nigeria Premier Real Estate</p>
        <h1 className="text-5xl font-bold text-white mb-6">
          CHUKWUJEKWU
          <br/>
          <span className="text-orange-500">Real Estate</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Discover verified properties across Nigeria
        </p>
        <a href="/listings" className="bg-orange-600 text-white font-bold px-8 py-4 rounded-xl mr-4">
          Browse Properties
        </a>
        <a href="/contact" className="border-2 border-orange-600 text-orange-500 font-bold px-8 py-4 rounded-xl">
          Contact Us
        </a>
      </div>
    </main>
  );
}
