"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { LoginForm, RegisterForm } from "./AuthForms";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");

  function handleSuccess() {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {mode === "login" ? (
        <>
          <LoginForm onSuccess={handleSuccess} />

          <p className="text-sm mt-4 text-center">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setMode("register")}
              className="text-blue-600"
            >
              Register
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onSuccess={() => setMode("login")} />

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-blue-600"
            >
              Login
            </button>
          </p>
        </>
      )}
    </Modal>
  );
}