"use client";
import { Button } from "../../../../components/ui/button";
import { db } from "../../../../utils/db";
import { MockInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    const GetInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0] || {});
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };
    
    GetInterviewDetails();
  }, [params.interviewId]);

  if (!interviewData) {
    return (
      <div className="my-10 text-center">
        <h2 className="font-bold text-3xl text-gray-900">Loading Interview Details...</h2>
      </div>
    );
  }

  return (
    <div className=" text-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Let's Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Job Details */}
          <div className="flex flex-col gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg text-gray-900 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                <strong>Job Role/Job Position:</strong> {interviewData.jobPosition}
              </h2>
              <h2 className="text-xl font-semibold text-gray-800">
                <strong>Job Description/Tech Stack:</strong> {interviewData.jobDesc}
              </h2>
              <h2 className="text-xl font-semibold text-gray-800">
                <strong>Years of Experience:</strong> {interviewData.jobExperience}
              </h2>
            </div>
            <div className="p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 text-yellow-500">
                <Lightbulb />
                <h3 className="font-semibold">Information</h3>
              </div>
              <p className="mt-3 text-yellow-600">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </p>
            </div>
          </div>

          {/* Webcam and Microphone Setup */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 300,
                  width: "100%",
                  zIndex: 10,
                  borderRadius: "8px",
                  border: "2px solid #4c51bf",
                }}
              />
            ) : (
              <>
                <WebcamIcon className="h-72 my-6 border-4 rounded-lg w-full p-10 bg-gray-200" />
                <Button
                  onClick={() => setWebCamEnabled(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition duration-300"
                >
                  Enable Web Cam and Microphone
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Start Interview Button */}
        <div className="flex justify-end mt-8">
          <Link href={`/dashboard/interview/${params.interviewId}/start`}>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-300">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
