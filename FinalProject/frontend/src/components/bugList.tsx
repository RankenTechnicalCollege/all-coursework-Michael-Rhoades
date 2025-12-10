import { BugListItem } from "@/components/bugListItem";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Bug } from "@/types/bug";

const BugList = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bugs`);
        setBugs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bugs');
        setLoading(false);
        console.error('Error fetching bugs:', err);
      }
    };

    fetchBugs();
  }, []);

  if (loading) return <div>Loading bugs...</div>;
  if (bugs.length === 0) return <div>No bugs found.</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  console.log(bugs)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bugs.map((bug) => (
        <Card key={bug._id}>
          <CardContent className="pt-6">
            <BugListItem bug={bug} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { BugList };