import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastBar, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
      <Toaster>
        {(t) => (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={t.visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            style={{ ...t.style }}
          >
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: "none",
              }}
            />
          </motion.div>
        )}
      </Toaster>
    </QueryClientProvider>
  );
}
