"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { Button } from "antd";
import { usePathname } from "next/navigation";

const User = () => {
  const pathname = usePathname();
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <div className="ml-5">
      {isLoaded && isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          {!pathname.includes("sign-in") && (
            <Button href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}>
              Login
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default User;
