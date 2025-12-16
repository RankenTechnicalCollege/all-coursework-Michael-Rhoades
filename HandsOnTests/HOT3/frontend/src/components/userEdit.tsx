import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import userEditSchema from "@/schemas/userEditSchema";

export function UserEdit({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const {userId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    role: [] as string[],
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`);
        setUser(response.data);
        setFormData({
          email: response.data.email || "",
          fullName: response.data?.fullName || "",
          role: response.data.role || [],
        })
        setLoading(false);
      }
      catch (err) {
        setError('Failed to fetch user');
        setLoading(false);
        console.error('Error fetching user:', err);
      }
    }
    fetchUser();
  }, [userId]);

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
    console.log("Submitting form data:", formData);

    try {
      const validatedData = userEditSchema.parse(formData);
      console.log("error spot 1")
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/me`, validatedData);
      console.log("error spot 2")
      showSuccess("User updated successfully");
      navigate("/user/list");
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

      showError("Failed to update user");
      setSaving(false);
      console.error("Error updating user:", err);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Loading user...</p>
      </div>
    );
  };

  if (error && !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">User not found</p>
      </div>
    );
  }

  const availableRoles = ["developer", "business analyst", "quality analyst", "product manager", "technical manager", "admin"];

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Update user information and permissions</CardDescription>
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
              onClick={() => navigate("/user/list")}
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