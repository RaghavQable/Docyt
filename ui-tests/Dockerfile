FROM cypress/browsers:node-20.9.0-chrome-118.0.5993.88-1-ff-118.0.2-edge-118.0.2088.46-1

ENV NO_COLOR=1
ENV ELECTRON_EXTRA_LAUNCH_ARGS="--disable-gpu"

RUN apt-get update && apt-get install -y bash python3 python3-pip
RUN pip install awscli
RUN mkdir /tests

COPY package.json /tests

RUN cd /tests &&\
    npm install &&\
    npm install cypress-multi-reporters

COPY . /tests

ENTRYPOINT ["/tests/entrypoint.sh"]
