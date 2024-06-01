import React, { Suspense } from "react";
import "./App.css";
import ThreeWrapper from "./components/three/wrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useChangeTools, useClient } from "./components/lib/tanstack";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/units/error";
import Header from "./components/commons/layout/header";
import TestWrapper from "./components/commons/item/test";
import AnimatePage from "./pages/AnimatePage";

function App() {
  const queryClient = useClient();
  const { preview } = useChangeTools();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<ThreeWrapper />}
            errorElement={<ErrorBoundary />}
          />
          <Route path="/test" element={<TestWrapper />} />
          <Route path="/:id" element={<ErrorBoundary />} />
          <Route path="/animate" element={<AnimatePage />} />
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
