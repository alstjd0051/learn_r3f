import React, { Suspense } from "react";
import "./App.css";
import ThreeWrapper from "./components/three/wrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useChangeTools, useClient } from "./components/lib/tanstack";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/units/error";
import Header from "./components/commons/layout/header";

function App() {
  const queryClient = useClient();
  const { preview } = useChangeTools();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={<ThreeWrapper />}
            errorElement={<ErrorBoundary />}
          />
          <Route path="/:id" element={<ErrorBoundary />} />
        </Routes>

        <Suspense fallback={<h1>Loading...</h1>}>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
            position={preview}
          />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
