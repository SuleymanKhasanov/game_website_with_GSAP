import Aboute from './components/Aboute';
import Hero from './components/Hero';
import Navbar from './components/Navbar.jsx';
import Features from './components/Features.jsx';
import Story from './components/Story.jsx';

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Aboute />
      <Features />
      <Story />
    </main>
  );
}

export default App;
