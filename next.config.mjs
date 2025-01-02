/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:[
          "res.cloudinary.com",
          "avatars.githubusercontent.com",
          "lh3.googleusercontent.com"
        ],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'https://lottie.host/embed/0d83e674-635a-418a-9f23-220ad594f11a/7AKmLCL58X.json',
          },
        ], 
      },
      experimental: {
        appDir: true,
        swcPlugins: [
          ["next-superjson-plugin",{}]
        ]
      }
};

export default nextConfig;
