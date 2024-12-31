import admin, { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
          type: process.env.FIREBASE_ADMIN_CONFIG_TYPE,
          project_id: process.env.FIREBASE_ADMIN_CONFIG_PROJECT_ID,
          private_key_id: process.env.FIREBASE_ADMIN_CONFIG_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_ADMIN_CONFIG_PRIVATE_KEY?.replace(/\\n/gm, '\n'), // https://github.com/gladly-team/next-firebase-auth/discussions/95#discussioncomment-473663
          client_email: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_ID,
          auth_uri: process.env.FIREBASE_ADMIN_CONFIG_AUTH_URI,
          token_uri: process.env.FIREBASE_ADMIN_CONFIG_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_ADMIN_CONFIG_CLIENT_X509_CERT_URL,
        } as ServiceAccount),
        storageBucket: process.env.FIREBASE_ADMIN_CONFIG_STORAGE_BUCKET,
    }
);
}

export const app = admin.apps[0];
export const db = getFirestore();
export const storage = getStorage();
