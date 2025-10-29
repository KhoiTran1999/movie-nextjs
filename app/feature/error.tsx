'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button, Result } from 'antd';
import Link from 'next/link';

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
    <div className="flex h-[100svh] w-[100svw] items-center justify-center">
      <Result
        status="500"
        title="500"
        subTitle={<span className="text-white">Sorry, something went wrong.</span>}
        extra={
          <Link href={'/'}>
            <Button onClick={() => reset()} type="primary">
              Back home
            </Button>
          </Link>
        }
      />
    </div>
  );
}
