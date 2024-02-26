"use client";
import React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};

export default Providers;
