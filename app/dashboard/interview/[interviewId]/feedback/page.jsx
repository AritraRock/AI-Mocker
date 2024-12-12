"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";


const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      const updatedFeedback = await Promise.all(
        result.map(async (item) => {
          const similarity = await computeSimilarity(
            toString(item.userAns),
            toString(item.correctAns)
          );
          return { ...item, similarity };
        })
      );

      setFeedbackList(updatedFeedback);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError("Failed to load feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const computeSimilarity = async (userAnswer, correctAnswer) => {
    const API_URL =
      "https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2";
    const API_KEY = "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";

    try {
      const response = await axios.post(
        API_URL,
        {
          inputs: {
            source_sentence: userAnswer,
            sentences: [correctAnswer],
          },
        },
        {
          headers: {
            Authorization: Bearer ${API_KEY},
            "Content-Type": "application/json",
            "x-wait-for-model": "true",
          },
        }
      );

      const similarityScore = response.data.similarity_scores?.[0];
      return similarityScore;
    } catch (error) {
      console.error("Error computing similarity:", error.response?.data || error.message);
      return null;
    }
  };

  const overallRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((acc, item) => acc + (item.rating || 0), 0) /
          5
        ).toFixed(2)
      : "N/A";

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      {loading ? (
        <h2 className="text-lg text-gray-500">Loading feedback...</h2>
      ) : error ? (
        <h2 className="text-red-500">{error}</h2>
      ) : feedbackList.length === 0 ? (
        <h2 className="font-bold text-lg text-green-500">No interview Feedback</h2>
      ) : (
        <>
          <h2 className="text-primary text-lg my-2">
            Your overall interview rating: <strong>{overallRating*10}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answers, your answer, and feedback for
            improvements for your next interview:
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg my-2 text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer:</strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer Looks Like:</strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback:</strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button className="mt-5" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;