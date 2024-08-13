import Head from "next/head";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>CryptoExchange - Trade Digital Assets Securely</title>
        <meta
          name="description"
          content="Your gateway to secure and fast crypto trading."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex-1 flex justify-center">
            <nav className="flex space-x-4">
              <a href="#features" className="text-lg hover:text-gray-400">
                Features
              </a>
              <a href="#how-it-works" className="text-lg hover:text-gray-400">
                How It Works
              </a>
              <a href="#contact" className="text-lg hover:text-gray-400">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white flex-1 flex flex-col justify-center items-center text-center py-20">
        <h2 className="text-5xl font-bold mb-6">
          Trade Digital Assets Securely
        </h2>
        <p className="text-xl mb-8">
          Fast, secure, and reliable platform for trading cryptocurrencies.
        </p>
        <a className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300">
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-12">
            Why Choose CryptoExchange?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-500 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Secure Transactions</h4>
              <p>
                All transactions are secured with the latest encryption
                technology, ensuring the safety of your assets.
              </p>
            </div>
            <div className="bg-blue-500 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Low Fees</h4>
              <p>
                Trade with some of the lowest fees in the market, maximizing
                your profits.
              </p>
            </div>
            <div className="bg-blue-500 shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">24/7 Support</h4>
              <p>
                Our dedicated support team is available around the clock to
                assist you with any queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-blue-500 py-20 mb-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <h4 className="text-xl font-bold mb-4">1. Sign Up</h4>
              <p>
                Create an account in just a few steps and get ready to start
                trading.
              </p>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-4">2. Deposit</h4>
              <p>Deposit funds using your preferred payment method securely.</p>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold mb-4">3. Trade</h4>
              <p>
                Start trading cryptocurrencies on our secure and user-friendly
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-3xl font-bold mb-12">Contact Us</h3>
          <p>
            Have any questions? Reach out to us via email at{" "}
            <a href="mailto:support@cryptoexchange.com" className="underline">
              support@cryptoexchange.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 CryptoExchange. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
