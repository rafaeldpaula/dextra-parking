#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )"

cd ../web
npm i
npm run build

cd ../api
mvn clean install
mvn appengine:devserver
