"use client";
// import { signIn } from 'next-auth/react';
import { Button, Card } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { GoogleSvg } from "../../../../public/svgs/svgs";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserAuth } from "../../../../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="login-warpper">
      <Card className="login-card">
        <div className="row">
          <div className="col-6">
            <div className="login-card-left">
              <GoogleSvg />
              <h1>Sign in</h1>
              <h2>Use your Google Account</h2>
            </div>
          </div>
          <div className="col-6">
            <div className="login-card-right">
              <button
                type="primary"
                className="login-btn unstyled-btn"
                onClick={handleSignIn}
              >
                <GoogleSvg /> Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </Card>
      <div className="tc-box">
        <ul>
          <li>
            <Link
              href="https://support.google.com/accounts?hl=en-US&amp;p=account_iph"
              target="_blank"
            >
              Help
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/privacy?gl=IN&hl=en-US"
              target="_blank"
            >
              Privacy
            </Link>
          </li>
          <li>
            <Link
              href="https://accounts.google.com/TOS?loc=IN&amp;hl=en-US"
              target="_blank"
            >
              Terms
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
