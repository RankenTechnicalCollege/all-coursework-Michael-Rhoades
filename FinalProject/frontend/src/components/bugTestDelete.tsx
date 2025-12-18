import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import type { Test } from "@/types/test";

export function BugTestDelete({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const { bugId, testId } = useParams();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

   useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/tests/${testId}`);
        setTest(response.data);
        setLoading(false);
      }
      catch (err) {
        setError('Failed to fetch test');
        setLoading(false);
        console.error('Error fetching test:', err);
      }
    }
    fetchTest();
  }, [testId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/tests/${testId}`);
      console.log("Test deleted successfully");
      showSuccess("Test deleted successfully");
      navigate(`/bug/${bugId}/edit`);
    }
    catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path.length > 0) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setSaving(false);
        return;
      }
      const axiosError = err as AxiosError<{
        type: string;
        fields: Record<string, string>;
        message: string;
      }>;

      if (axiosError.response?.status === 400 && axiosError.response?.data?.type === "ValidationFailed") {
        setSaving(false);
        return;
      }

      showError("Failed to update test");
      setSaving(false);
      console.error("Error updating test:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Loading test...</p>
      </div>
    );
  };

  if (error && !test) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Test not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Are you sure you want to delete this test case?</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>

          <CardFooter className="flex gap-2">
            <Button type="submit">
              Delete
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/bug/${bugId}/edit`)}
              disabled={saving}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}