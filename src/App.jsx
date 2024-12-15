import Aboute from './components/Aboute';
import Hero from './components/Hero';
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar/>
      <Hero />
      <Aboute />
    </main>
  );
}

export default App;
