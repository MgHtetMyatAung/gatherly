/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-alpha-sig.figma.com",
                pathname: "/img/**"
            }
        ]
    }
};

export default nextConfig;
