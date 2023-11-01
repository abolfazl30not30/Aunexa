#!/bin/bash
cat package.json | grep 'version' | awk -F ': ' '{print $2}' | awk -F '"' '{print $2}' > app-version
