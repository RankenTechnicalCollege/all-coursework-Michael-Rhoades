import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import axios from "axios";
import type { Bug } from "@/types/bug";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import bugEditSchema from "@/schemas/bugEditSchema";
import { BugCommentItem } from "@/components/bugCommentItem";
import { Pencil, BookOpenText, X, ExternalLink, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import bugClassifySchema from "@/schemas/bugClassifySchema";
import type { User } from "@/types/user";
import bugAssignSchema from "@/schemas/bugAssignSchema";
import bugCloseSchema from "@/schemas/bugCloseSchema";
import bugCommentSchema from "@/schemas/bugCommentSchema";

export function BugEdit({ showError, showSuccess }: { showError: (message: string) => void; showSuccess: (message: string) => void }) {
  const {bugId} = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stepsToReproduce: "",
  });

  const [formDataClassify, setFormDataClassify] = useState({
    classification: "",
  });

  const [formDataAssign, setFormDataAssign] = useState({
    assignedToUserId: "",
  });

  const [formDataClose, setFormDataClose] = useState({
    closed: false,
  });

  const [formDataComment, setFormDataComment] = useState({
    text: "",
  });

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs/${bugId}`);
        setBug(response.data);
        setFormData({
          title: response.data?.title || "",
          description: response.data?.description || "",
          stepsToReproduce: response.data.stepsToReproduce || "",
        })
        setFormDataClassify({
          classification: response.data?.classification || "",
        })
        setFormDataClose({
          closed: response.data?.closed || false,
        })
        setLoading(false);
      }
      catch (err) {
        setError('Failed to fetch bug');
        setLoading(false);
        console.error('Error fetching bug:', err);
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
        console.error('Error fetching users:', err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user');
        setLoading(false);
        console.error('Error fetching user:', err);
      }
    };

    fetchUsers();
    fetchUser();
    fetchBug();
  }, [bugId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataComment((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormDataClassify((prev) => ({ ...prev, [name]: value }));
  // };

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

  const handleSubmitClassify = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugClassifySchema.parse(formDataClassify);
      console.log("error spot 1")
      await axios.patch(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/classify`, validatedData);
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

  const handleSubmitAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugAssignSchema.parse(formDataAssign);
      console.log("error spot 1")
      await axios.patch(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/assign`, validatedData);
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

  const handleSubmitClose = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugCloseSchema.parse(formDataClose);
      console.log("error spot 1")
      await axios.patch(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/close`, validatedData);
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

    const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setValidationErrors({});

    try {
      const validatedData = bugCommentSchema.parse(formDataComment);
      console.log("error spot 1")
      await axios.post(`${import.meta.env.VITE_API_URL}/bugs/${bugId}/comments`, validatedData);
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

  if (bug.comments === undefined) {
    console.log("No comments found for this bug.");
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg">Bug comments not found</p>
      </div>
    );
  }

  return (
    <>
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
              <Button type="submit">
                Save Changes<Save className="h-4 w-4" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bug.comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <BugCommentItem comment={comment} />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Post comment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmitComment}>
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
                value={formDataComment.text}
                onChange={handleInputChangeComment}
              />
              {validationErrors.text && (
                <p className="text-sm text-red-500">{validationErrors.text}</p>
              )}
            </div>

          </CardContent>

          <CardFooter className="flex gap-2">
            <Button type="submit">
              Post<Pencil className="h-4 w-4" />
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
    <form onSubmit={handleSubmitClassify}>
        <div className="flex gap-2">
          <Select name="classification" onValueChange={(value) => setFormDataClassify((prev) => ({ ...prev, classification: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={bug.classification || "Unclassified"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="unapproved">Unapproved</SelectItem>
              <SelectItem value="duplicate">Duplicate</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">
            Classify Bug<BookOpenText className="h-4 w-4" />
          </Button>
        </div>
      </form>
      <form onSubmit={handleSubmitAssign}>
        <div className="flex gap-2">
          <Select name="assignedToUserId" onValueChange={(value) => setFormDataAssign((prev) => ({ ...prev, assignedToUserId: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={user?._id || "Unassigned"} />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>{user.fullName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">
            Assign Bug<ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </form>
      <form onSubmit={handleSubmitClose}>
        <div className="flex gap-2">
          <Select name="closed" onValueChange={(value) => setFormDataClose((prev) => ({ ...prev, closed: value === "true" }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={bug.closed ? "Closed" : "Open"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Closed</SelectItem>
              <SelectItem value="false">Open</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">
            Close Bug<X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </>
  );
}