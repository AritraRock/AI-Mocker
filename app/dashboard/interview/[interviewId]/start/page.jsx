"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Questions */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
            <QuestionsSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
            />
          </div>

          {/* Video or Audio Recording */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interViewData}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 space-x-4">
          <div>
            {activeQuestionIndex > 0 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Previous Question
              </Button>
            )}
          </div>
          <div>
            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Next Question
              </Button>
            )}
            {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
              <Link href={`/dashboard/interview/${interViewData?.mockId}/feedback`}>
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  End Interview
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
