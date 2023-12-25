"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
export default function RootLayout({ children }) {
  const pages = useSelector((state) => state.access.pages);
  const router = useRouter();

  if (pages.hasOwnProperty("VehiclesAndEquipment")) {
    return <>{children}</>;
  } else {
    router.push("/panel");
  }
}
