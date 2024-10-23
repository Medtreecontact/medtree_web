/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

function loadTargetEnv(target) {
    // Constructs a path such as env/.env.development
    const envPath = path.join('env', `.env.${target}`);
    return dotenv.parse(fs.readFileSync(envPath));
}

const nextConfig = {
    // webpack: (config, { isServer }) => {
    //     if (isServer) {
    //       config.plugins.push(
    //         new webpack.BannerPlugin({
    //           banner: 'require("reflect-metadata");',
    //           raw: true,
    //           entryOnly: true,
    //         }),
    //       );
    //     }
    //     return config;
    // },

    // Attention ces variables sont accessibles côté client
    // pour des donnés sensibles utiliser : .env
    env: loadTargetEnv(process.env.TARGET_ENVIRONMENT)
};

export default nextConfig;
