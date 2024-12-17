/** @type {import('next').NextConfig} */

// import fs from 'fs';
// import path from 'path';

// // Copy .env file from /env/.env.dev to the root of the project
// const source = path.join(process.cwd(), 'env', `.env.${process.env.TARGET_ENVIRONMENT}`);
// const destination = path.join(process.cwd(), '.env');

// fs.copyFileSync(source, destination);

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
        ],
      },
};

export default nextConfig;