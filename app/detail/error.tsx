"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button, Result } from "antd";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-[100svw] h-[100svh] flex justify-center items-center">
      <Result
        status="500"
        title="500"
        subTitle={
          <span className="text-white">Sorry, something went wrong.</span>
        }
        extra={
          <Link href={"/"}>
            <Button onClick={() => reset()} type="primary">
              Back home
            </Button>
          </Link>
        }
      />
    </div>
  );
}
