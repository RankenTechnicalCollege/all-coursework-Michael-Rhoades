import { BugListItem } from "@/components/bugListItem";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import api from "@/lib/api";

import type { Bug } from "@/types/bug";

const BugList = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [keywords, setKeywords] = useState("");
  const [classification, setClassification] = useState<string>("all"); // Default 'all' logic handled in effect
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [closed, setClosed] = useState(false);
  const [sortBy, setSortBy] = useState("title");

  const fetchBugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (keywords) params.append("keywords", keywords);
      if (classification && classification !== "all") params.append("classification", classification);
      if (minAge) params.append("minAge", minAge);
      if (maxAge) params.append("maxAge", maxAge);
      if (sortBy) params.append("sortBy", sortBy);
      if (closed) params.append("closed", closed.toString());
      console.log("test")
      const response = await api.get(
        `/bugs?${params.toString()}`
      );

      setBugs(response.data);
    } catch (err) {
      setError("Failed to fetch bugs");
      console.error("Error fetching bugs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleSearch = () => {
    fetchBugs();
  };

  useEffect(() => {
    fetchBugs();
  }, [classification, sortBy]);

  const toggleClosed = () => {
    setClosed(!closed);
    console.log(closed);
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search bugs..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Classification</label>
            <Select value={classification} onValueChange={setClassification}>
              <SelectTrigger>
                <SelectValue placeholder="Select classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classifications</SelectItem>
                <SelectItem value="unclassified">Unclassified</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="unapproved">Unapproved</SelectItem>
                <SelectItem value="duplicate">Duplicate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Min Age (days)</label>
            <Input
              type="number"
              placeholder="Min Age"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Max Age (days)</label>
            <Input
              type="number"
              placeholder="Max Age"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
            />
          </div>
          <Checkbox onClick={toggleClosed}>Closed</Checkbox>
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="classification">Classification</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="assignedTo">Assigned To</SelectItem>
                <SelectItem value="createdBy">Created By</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading bugs...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bugs.map((bug) => (
            <Card key={bug._id}>
              <CardContent className="pt-6">
                <BugListItem bug={bug} />
              </CardContent>
            </Card>
          ))}
          {bugs.length === 0 && <div className="col-span-full text-center text-muted-foreground">No bugs found</div>}
        </div>
      )}
    </div>
  );
};

export { BugList };