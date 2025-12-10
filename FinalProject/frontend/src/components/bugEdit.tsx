import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import type { Bug } from "@/types/bug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import bugEditSchema from "@/schemas/bugEditSchema";

export function BugEdit({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const {bugId} = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stepsToReproduce: [] as string[],
  });

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs/${bugId}`);
        setBug(response.data);
        setFormData({
          title: response.data?.title || "",
          description: response.data?.description || "",
          stepsToReproduce: response.data.stepsToReproduce || [],
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

  const handleRoleChange = (role: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      role: checked
        ? [...prev.role, role]
        : prev.role.filter((r) => r !== role),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugEditSchema.parse(formData);
      console.log("error spot 1")
      await axios.patch(`${import.meta.env.VITE_API_URL}/bugs/${bugId}`, validatedData);
      console.log("error spot 2")
      showSuccess("Bug updated successfully");
      navigate("/bug/list");
    }
    catch (err) {
      console.log("error spot 3")
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

  const availableRoles = ["developer", "business analyst", "quality analyst", "product manager", "technical manager", "admin"];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Bug</CardTitle>
          <CardDescription>Update bug information and permissions</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              {validationErrors.fullName && (
                <p className="text-sm text-red-500">{validationErrors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Roles</Label>
              <div className="space-y-2">
                {availableRoles.map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${role}`}
                      checked={formData.role.includes(role)}
                      onCheckedChange={(checked) =>
                        handleRoleChange(role, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`role-${role}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
              {validationErrors.role && (
                <p className="text-sm text-red-500">{validationErrors.role}</p>
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