"use client";

import React, { useMemo } from "react";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="rounded-sm overflow-hidden border-[1px] border-lightblack/20"
      />
    </div>
  );
};
