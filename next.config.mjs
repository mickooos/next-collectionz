/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "2gaj6ltcqkjyranl.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
