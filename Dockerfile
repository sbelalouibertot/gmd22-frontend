FROM node:16 as prod

WORKDIR /app
COPY package.json package-lock.json ./
COPY .next ./.next
RUN npm i --only=production --legacy-peer-deps

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

EXPOSE $PORT

ENV PORT $PORT

CMD ["npm", "start"]
