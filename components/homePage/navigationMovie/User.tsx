"use client";

import React, { useEffect, useRef, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button, Tour } from "antd";
import type { TourProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const User = () => {
  const pathname = usePathname();

  const { user, isLoaded, isSignedIn } = useUser();

  const loginRef = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Login with Microsoft Account",
      description: "You're gonna have a better movie watching experience",
      cover: (
        <img
          className="rounded-md"
          alt="Login with Microsoft"
          src="/loginWithMicrosoft.jpg"
        />
      ),
      target: () => loginRef.current,
    },
  ];

  useEffect(() => {
    const isNew = localStorage.getItem("visit") == null;
    if (isNew && isSignedIn) {
      localStorage.setItem("visit", "TRUE");
      setOpen(true);
      //It's a new user
    } else {
      //It's not a new user
      localStorage.setItem("visit", "TRUE");
    }
  }, []);

  return (
    <div className="ml-5">
      {isLoaded && isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <>
          {!pathname.includes("sign-in") && (
            <Button
              ref={loginRef}
              href={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
            >
              Login
            </Button>
          )}
        </>
      )}
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
        animated={true}
        mask={{ color: "#ffffff3e" }}
        closeIcon={
          <CloseOutlined className="rounded-full bg-[#ffffff3e] p-1" />
        }
      />
    </div>
  );
};

export default User;
