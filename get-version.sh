#!/bin/bash
cat pom.xml | grep -m 2 '<version>' | awk -F '>' '{print $2}' | awk -F '<' '{print $1}' | awk 'NR==2' > app-version
