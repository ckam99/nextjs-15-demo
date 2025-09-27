"use client"
import { useLoginQuery } from "@/features/auth/hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { FieldInfo } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { loginRequestSchema } from "@/features/auth/schemas/auth";

export default function Page() {

    const searchParams = useSearchParams();

     const router = useRouter();

     const queryCtx = useLoginQuery({
       onSuccess: async () => {
         const to =  searchParams.get("redirect") || "/";
         router.push(to);
         return;
       },
     });


    const form = useForm({
      defaultValues: {
        email: "",
        password: "",
      },
      validators: {
        onChange: loginRequestSchema,
      },
      onSubmit: async ({ value }) => {
        console.log("form", value);
     //   alert(JSON.stringify(value))
        //
        queryCtx.mutate(value)
      },
    });
    
  return (
    <form
      className="p-8"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="text-4xl pb-6">Sign in</div>
      {queryCtx.isError && (
        <div className="border border-red-100 text-red-400 bg-red-50 p-4 rounded my-3">
          {queryCtx.error.message}
        </div>
      )}
      <form.Field
        name="email"
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={(field) => {
          return (
            <>
              <Input
                type="text"
                placeholder="Username"
                className=" p-2 w-full mb-4"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
      <form.Field
        name="password"
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={(field) => {
          return (
            <>
              <Input
                type="password"
                placeholder="Password"
                className="p-2 w-full mb-4"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={([canSubmit, isSubmitting]) => (
          <>
            <Button
              type="submit"
              disabled={!canSubmit}
              className=" p-2 rounded w-full"
            >
              {isSubmitting ? "..." : " Sign In"}
            </Button>
          </>
        )}
      />
    </form>
  );
}
