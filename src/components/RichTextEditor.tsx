import React from "react";
import { useEditor, useEditorState, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export default function RichTextEditor({
  onSave,
}: {
  onSave?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: true }), Underline],
    content: "",
  });
  const { t } = useTranslation("common");

  const active = useEditorState({
    editor,
    selector: (snapshot) => {
      const ed = snapshot.editor;
      return {
        bold: !!ed && ed.isActive("bold"),
        italic: !!ed && ed.isActive("italic"),
        underline: !!ed && ed.isActive("underline"),
        strike: !!ed && ed.isActive("strike"),
        bulletList: !!ed && ed.isActive("bulletList"),
        orderedList: !!ed && ed.isActive("orderedList"),
        link: !!ed && ed.isActive("link"),
      };
    },
  }) ?? {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    bulletList: false,
    orderedList: false,
    link: false,
  };

  if (!editor) return null;

  const handleSave = () => {
    const html = editor.getHTML();
    fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: html }),
    });
    onSave?.(html);
  };

  const ToolbarButton = ({
    onClick,
    children,
    active,
    title,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    active?: boolean;
    title?: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center w-6 h-6 rounded-md transition
        ${
          active ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-200"
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto p-2">
      <div className="flex flex-wrap gap-2 bg-gray-100 border p-2 rounded-md">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={active.bold}
          title="Bold"
        >
          <FormatBoldIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={active.italic}
          title="Italic"
        >
          <FormatItalicIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={active.underline}
          title="Underline"
        >
          <FormatUnderlinedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={active.strike}
          title="Strikethrough"
        >
          <StrikethroughSIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={active.bulletList}
          title="Bullet List"
        >
          <FormatListBulletedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={active.orderedList}
          title="Numbered List"
        >
          <FormatListNumberedIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
          }}
          active={active.link}
          title="Insert Link"
        >
          <LinkIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <UndoIcon fontSize="small" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <RedoIcon fontSize="small" />
        </ToolbarButton>
      </div>

      <div className="mt-1 ">
        <EditorContent editor={editor} className="tiptap-editor " />
      </div>

      <Button onClick={handleSave} className="mt-3">
        {t("save")}
      </Button>
    </div>
  );
}
