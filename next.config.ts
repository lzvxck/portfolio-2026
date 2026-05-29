import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // Bundle the ONNX model cache and embedding index into the chat function
    "/api/chat": ["./node_modules/onnxruntime-node/**", "./data/**"],
  },
};

export default nextConfig;
