/** @type {import('next').NextConfig} */
import BundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
