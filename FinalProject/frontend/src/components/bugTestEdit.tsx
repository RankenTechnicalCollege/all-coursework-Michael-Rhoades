import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import bugTestSchema from "@/schemas/bugTestSchema";
import type { Test } from "@/types/test";

export function BugTestEdit({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const { bugId, testId } = useParams();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
    title: "",
    result: "",
  });

   useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/tests/${testId}`);
        setTest(response.data);
        setFormData({
          title: response.data?.title || "",
          result: response.data?.result || "",
        })
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




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});
    console.log("Submitting test:", formData);

    try {
      const validatedData = bugTestSchema.parse(formData);
      console.log("Submitting test:", validatedData);
      await axios.patch(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/tests/${testId}`, validatedData);
      console.log("Test added successfully");
      showSuccess("Test added successfully");
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
        setValidationErrors(fieldErrors);
        setSaving(false);
        return;
      }
      const axiosError = err as AxiosError<{
        type: string;
        fields: Record<string, string>;
        message: string;
      }>;

      if (axiosError.response?.status === 400 && axiosError.response?.data?.type === "ValidationFailed") {
        setValidationErrors(axiosError.response.data.fields || {});
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
          <CardTitle>Edit Test Case</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
              {validationErrors.title && (
                <p className="text-sm text-red-500">{validationErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="result">Result</Label>
              <Input
                id="result"
                name="result"
                type="text"
                value={formData.result}
                onChange={handleInputChange}
              />
              {validationErrors.result && (
                <p className="text-sm text-red-500">{validationErrors.result}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="flex gap-2">
            <Button type="submit">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/bug/list")}
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