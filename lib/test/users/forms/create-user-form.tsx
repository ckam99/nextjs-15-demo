// app/create-user/create-user-form.tsx
"use client";

import React, { useState } from "react";
import { createUser } from "../actions/user-mutation-actions";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { UserFormData, UserFormSchema } from "../schemas/user-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-400">
          {field.state.meta.errors.map((e) => e?.message).join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const defaultValues: UserFormData = {
  name: "",
  username: "",
  email: "",
};

export function CreateUserForm() {
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: UserFormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      //   await new Promise((resolve) => setTimeout(resolve, 3000));
      setMessage("");
      const result = await createUser(value);

      if (result.success) {
        setMessage(
          `Success! User "${result.data?.name}" created with mock ID: ${result.data?.id}`
        );
        formApi.reset(defaultValues);
      } else {
        setMessage(`Error: ${result.error}`);
      }
      //  setLoading(false);
    },
  });

  const [message, setMessage] = useState("");

  return (
    <form
      className=" relative"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Create New User</h2>

      <form.Field name="name">
        {(field) => (
          <>
            <div>
              <Label htmlFor={field.name}>Full Name:</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          </>
        )}
      </form.Field>
      <form.Field name="username">
        {(field) => (
          <>
            <div>
              <Label htmlFor="username">Username:</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          </>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <>
            <div>
              <Label htmlFor="email">Email:</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          </>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <>
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "Creating..." : "Submit"}
            </Button>
          </>
        )}
      </form.Subscribe>

      {message && (
        <>
          {message.includes("Error") ? (
            <p
              style={{
                marginTop: "10px",
                color: message.includes("Error") ? "red" : "green",
              }}
            >
              {message}
            </p>
          ) : (
            <div className=" fixed top-0 bottom-0 left-0 right-0 flex flex-col  items-center justify-center bg-white">
              <div className="zoom-in-once  w-[100px] h-[100px] bg-green-500 text-white flex  items-center justify-center rounded-full">
                <CircleCheckBig className="w-12 h-12" />
              </div>
              <div className="mt-10" />
              <div>{message}</div>
              <Link href={"/tests/users"} className=" underline">
                Back to list
              </Link>
            </div>
          )}
        </>
      )}
    </form>
  );
}
