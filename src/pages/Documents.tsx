import DisplayContent from "@/components/DisplayContent";
import RichTextEditor from "@/components/RichTextEditor";
import { useState } from "react";

export default function DocumentsPage() {
  const [savedContent, setSavedContent] = useState("");
  return (
    <div className="space-y-2">
      <RichTextEditor onSave={setSavedContent} />
      <h2 className="mt-6 mb-2 text-lg">Saved Content:</h2>
      <DisplayContent html={savedContent} />
      <h2 className="mt-6 mb-2 text-lg font-semibold">HTML Output:</h2>
      <pre className="p-3 bg-muted rounded-md border border-border text-sm overflow-x-auto">
        {savedContent || "<empty>"}
      </pre>
    </div>
  );
}
