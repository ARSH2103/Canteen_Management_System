
import Header from "./Header";
import MainContent from "./MainContent";
import MainStatsSection from "./MainStatsSection";


const HomePage = () => {

  return (

    <div className="min-h-screen bg-[#219C89] text-white flex flex-col">

      <Header />
      <MainContent />
      <MainStatsSection />

    </div>
  );
};

export default HomePage;