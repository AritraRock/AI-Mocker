import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10 bg-white">
      <div className="mx-auto text-center">
        <div className="font-bold text-gray-600 mb-4">Create and Start Your AI Mockup Interview</div>
        <div className="flex justify-center items-center">
          <div className="bg-[#4642d2] text-white rounded-lg p-8 shadow-md hover:bg-[#3731b3] transition-colors">
            <AddNewInterview />
          </div>
        </div>
      </div>
      {/* previous interview questions */}
      <div className="rounded-lg mt-6">
        <InterviewList className=""/>
      </div>
    </div>
  );
};

export default Dashboard;
