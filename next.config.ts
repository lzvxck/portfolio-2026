import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // embeddings.json is not a JS import so Next.js won't trace it automatically
    "/api/chat": ["./data/**"],
  },
  outputFileTracingExcludes: {
    // onnxruntime-node ships binaries for win32 + darwin + linux.
    // Vercel runs Linux only — strip the other two to stay under the 250 MB limit.
    "/api/chat": [
      "./node_modules/onnxruntime-node/bin/napi-v3/win32/**",
      "./node_modules/onnxruntime-node/bin/napi-v3/darwin/**",
    ],
  },
};

export default nextConfig;
