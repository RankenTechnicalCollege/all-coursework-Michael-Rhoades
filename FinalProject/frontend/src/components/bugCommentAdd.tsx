import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import type { Bug } from "@/types/bug";
import bugCommentSchema from "@/schemas/bugCommentSchema";

export function BugCommentAdd({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const {bugId} = useParams();

    const [formData, setFormData] = useState({
    text: "",
  });

   useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs/${bugId}`);
        setBug(response.data);
        setFormData({
          text: response.data?.text || "",
        })
        setLoading(false);
      }
      catch (err) {
        setError('Failed to fetch bug');
        setLoading(false);
        console.error('Error fetching bug:', err);
      }
    }
    fetchBug();
  }, [bugId]);




  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});
    console.log("Submitting comment1:", formData);

    try {
      const validatedData = bugCommentSchema.parse(formData);
      console.log("Submitting comment2:", validatedData);
      await axios.post(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/comments`, validatedData);
      console.log("Comment added successfully");
      showSuccess("Comment added successfully");
      navigate("/bug/list");
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

      showError("Failed to update bug");
      setSaving(false);
      console.error("Error updating bug:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Loading bug...</p>
      </div>
    );
  };

  if (error && !bug) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!bug) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Bug not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Post comment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                name="text"
                type="text"
                value={formData.text}
                onChange={handleInputChange}
              />
              {validationErrors.text && (
                <p className="text-sm text-red-500">{validationErrors.text}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Post"}
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