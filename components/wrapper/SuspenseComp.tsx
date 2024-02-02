"use client";

import { Suspense } from "react";

export const SuspenseComp = ({ children }: { children: React.ReactNode }) => {
  return <Suspense>{children}</Suspense>;
};
