import React from 'react'
import { useMessageStore } from '../store/useMessageStore';
import Sidebar from '../components/Sidebar';
import NoChat from '../components/NoChartComponent';
import ChartComponent from '../components/ChartComponent';

const Home = () => {
  const { selectedUser } = useMessageStore();

  return (
    <div className="h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className=" rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] bg-[#151313]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>

            {!selectedUser ? <NoChat /> : <ChartComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home