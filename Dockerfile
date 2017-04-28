FROM kkarczmarczyk/node-yarn
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=vivo-em-nos-staging
ARG AWS_ACCESS_KEY_ID=xxx
ARG AWS_SECRET_ACCESS_KEY=yyy
ARG CLOUDFRONT_DISTRIBUTION_ID=zzz
ENV NODE_ENV=production NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001

RUN mkdir /code
WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn
COPY . /code

RUN AWS_BUCKET=$AWS_BUCKET \
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    NODE_ENV=$NODE_ENV \
    CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID \
    yarn run build

CMD ["yarn", "start"]

EXPOSE 5001
