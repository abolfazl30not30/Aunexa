"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const pages = useSelector((state) => state.access.pages);
  const router = useRouter();
  if (pages.hasOwnProperty("Products")) {
    return <>{children}</>;
  } else {
    return <>{children}</>;
    // router.push("/panel")
  }
}
