import Image from "next/image";
import linkedin from "../assets/linkedin.png";
import github from "../assets/github.png";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-700 text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-4">
              <a href="#features" className="text-lg hover:text-gray-400">
                Features
              </a>
              <a href="#contact" className="text-lg hover:text-gray-400">
                Made By
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gray-900 text-white flex-1 flex flex-col justify-center items-center text-center py-20">
        <h2 className="text-5xl font-bold mb-6">Exchange Application</h2>
        <p className="text-xl mb-8">
          Fast, secure, and reliable platform for trading cryptocurrencies.
        </p>
        <a
          href="/markets"
          className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Explore Various Crypto Markets
        </a>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Web Socket Stuff</h4>
              <p>
                Implemented Singleton pattern for web socket for fetching all
                the real time data for the exchange.
              </p>
            </div>
            <div className="bg-gray-900 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Trading View</h4>
              <p>Observe the current k-line data for your favourite stock.</p>
            </div>
            <div className="bg-gray-900 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Order Book</h4>
              <p>Get hands on the current asks, bids and the recent trades.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-12">Made By</h3>
          <p>Nischay</p>
          <div className="mt-8 flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/nischay-b87027214/"
              target="_blank"
            >
              <Image
                src={linkedin}
                alt="Linkedin"
                width={48} // set the width
                height={48} // set the height
                className="object-fit"
              />
            </a>
            <a href="https://github.com/StoneRaptor5870" target="_blank">
              <Image
                src={github}
                alt="Github"
                width={48} // set the width
                height={48} // set the height
                className="object-fit"
              />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-700 text-white py-6">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 Exchange. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
