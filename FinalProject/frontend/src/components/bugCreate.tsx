import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import bugEditSchema from "@/schemas/bugEditSchema";

export function BugCreate({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stepsToReproduce: "",
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugEditSchema.parse(formData);
      await axios.post(`${import.meta.env.VITE_API_URL}/bugs`, validatedData);
      showSuccess("Bug added successfully");
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

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Bug</CardTitle>
          <CardDescription>Update bug information</CardDescription>
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
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                type="text"
                value={formData.description}
                onChange={handleInputChange}
              />
              {validationErrors.description && (
                <p className="text-sm text-red-500">{validationErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
              <Input
                id="stepsToReproduce"
                name="stepsToReproduce"
                type="text"
                value={formData.stepsToReproduce}
                onChange={handleInputChange}
              />
              {validationErrors.stepsToReproduce && (
                <p className="text-sm text-red-500">{validationErrors.stepsToReproduce}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
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