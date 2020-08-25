#!/bin/bash

cd nopaper-frontend/
npm run build
git add .
git commit -m "run build"
git push
cd ..
git subtree push --prefix nopaper-frontend heroku master
