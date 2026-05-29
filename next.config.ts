import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // data/embeddings.json and the Linux onnxruntime native binary are not
    // JS imports so Next.js static tracing won't pick them up automatically.
    // onnxruntime-node resolves its binary via process.platform at runtime
    // (dynamic require) — nft can't see it statically.
    "/api/chat": [
      "./data/**",
      "./node_modules/onnxruntime-node/bin/napi-v6/linux/**",
    ],
  },
  outputFileTracingExcludes: {
    // Strip win32 and darwin binaries — Vercel runs Linux only.
    "/api/chat": [
      "./node_modules/onnxruntime-node/bin/napi-v6/win32/**",
      "./node_modules/onnxruntime-node/bin/napi-v6/darwin/**",
    ],
  },
};

export default nextConfig;
