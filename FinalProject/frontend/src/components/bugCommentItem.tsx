// import type { Comment } from "@/types/comment";

interface Comment {
  id: string;
  authorId: string;
  authorName?: string;
  text: string;
  commentedOn: Date;
}

const BugCommentItem = ({ comment }: { comment: Comment }) => {
  const getDisplayName = () => {
    if (comment.authorName && comment.authorName?.trim().length > 0) {
      return comment.authorName;
    }
    else {
      return "Anonymous User";
    }
  }
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="font-medium text-lg">{getDisplayName()}</div>
        <div className="text-sm text-gray-500">{new Date(comment.commentedOn).toLocaleString()}</div>
      </div>
      <div className="text-sm text-gray-500">{comment.text || "No Text"}</div>
    </div>
  )
}

export { BugCommentItem };