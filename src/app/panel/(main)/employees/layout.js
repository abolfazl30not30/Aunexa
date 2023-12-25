"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function RootLayout({ children }) {
  const router = useRouter();
  const pages = useSelector((state) => state.access.pages);

  if (pages.hasOwnProperty("Employees")) {
    return <>{children}</>;
  } else {
    router.push("/panel");
  }
}
