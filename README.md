First, run the development server:
npm run dev
or
npx next dev

add shadcn component : 
npx shadcn@latest add [component]

deploy to cloud run (remove .env from gitignore & comment env copy in next.config.mjs)
gcloud run deploy medtree --source=. --project=medtree-development --region=europe-west3 --allow-unauthenticated