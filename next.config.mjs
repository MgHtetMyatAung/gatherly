/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3-alpha-sig.figma.com",
                pathname: "/img/**"
            },
            {
                protocol: "https",
                hostname: "via.placeholder.com"
            },
            {
                protocol: "https",
                hostname: "events.xebia.com"
            },
            {
                protocol: "https",
                hostname: "static-00.iconduck.com"
            }
        ]
    }
};

export default nextConfig;
