import React, { Suspense } from "react";
import "./App.css";
import ThreeWrapper from "./components/three/wrapper";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useChangeTools, useClient } from "./components/lib/tanstack";

function App() {
  const queryClient = useClient();
  const { preview } = useChangeTools();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThreeWrapper />
        <Suspense fallback={null}>
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
