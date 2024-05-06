"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { formSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authFormSchema = formSchema(type);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="flex cursor-pointer items-center gap-1">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-imb-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h2 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h2>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      name="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name..."
                      form={form}
                    />
                    <CustomInput
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Enter your last name..."
                      form={form}
                    />
                  </div>
                  <CustomInput
                    name="address1"
                    label="Address"
                    type="text"
                    placeholder="Enter your specific address..."
                    form={form}
                  />
                  <CustomInput
                    name="city"
                    label="City"
                    type="text"
                    placeholder="Enter your city..."
                    form={form}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      name="state"
                      label="State"
                      type="text"
                      placeholder="Example: NY"
                      form={form}
                    />
                    <CustomInput
                      name="postalCode"
                      label="Postal Code"
                      type="text"
                      placeholder="Example: 11102"
                      form={form}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      form={form}
                    />
                    <CustomInput
                      name="ssn"
                      label="SSN"
                      type="text"
                      placeholder="Example: 1234"
                      form={form}
                    />
                  </div>
                </>
              )}
              <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email address..."
                form={form}
              />
              <CustomInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password..."
                form={form}
              />

              <div className="flex flex-col gap-4">
                <Button className="form-btn" disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
