FROM yeuem1vannam/c9ide:core

ENV NODE_ENV=development
RUN apt-get update && apt-get install -y \
  ruby ruby-dev rubygems &&\
  rm -rf /var/lib/apt/lists/*

RUN gem install compass --no-document
RUN npm install -g grunt bower

COPY ./package.json /workspace
RUN cd /workspace && npm install

COPY ./bower.json /workspace
RUN cd /workspace && bower install --allow-root

ADD . /workspace

EXPOSE 5000
