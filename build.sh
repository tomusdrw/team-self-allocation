#!/bin/sh
rm .build -Rf
meteor build --directory .build
cd .build
mv bundle tsa-app
tar cvjf meteor.tar.bz2 tsa-app -R
