#!/bin/bash
/home/administrator/sonar-scanner-4.3.0.2102/bin/sonar-scanner \
  -Dsonar.projectKey=lighthouse-progressive-web-application-20013649-node-M6Sprint4-Modules_for_Admin_Role_and_RetailerRole \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://172.16.0.220:9000 \
  -Dsonar.login=32cf9325138f97409198a1a1373cd27f6c9cdded