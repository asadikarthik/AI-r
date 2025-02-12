import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function AIResumeBuilder() {
  const [resumeText, setResumeText] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateResume = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-resume", { text: resumeText });
      setGeneratedResume(response.data.resume);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Resume Builder</h1>
      <Card className="w-full max-w-lg">
        <CardContent>
          <Input
            placeholder="Enter your resume details..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleGenerateResume} disabled={loading}>
            {loading ? "Generating..." : "Generate Resume"}
          </Button>
          {generatedResume && (
            <div className="mt-4 p-4 border rounded bg-gray-100">
              <h2 className="text-lg font-semibold">Generated Resume:</h2>
              <p>{generatedResume}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
