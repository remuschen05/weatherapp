import React from 'react';
import Navbar from '../components/layout/Navbar';
import ClassWeatherSearch from '../components/weather/ClassWeatherSearch';

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto py-12 px-2">
        <div className="">
          <div className="py-4">
            <ClassWeatherSearch />
          </div>
          <div className="py-4">
            <ClassWeatherSearch />
          </div>
          <div className="py-4">
            <ClassWeatherSearch />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
