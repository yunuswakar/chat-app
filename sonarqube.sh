#!/bin/bash
/home/administrator/sonar-scanner-4.3.0.2102/bin/sonar-scanner \
  -Dsonar.projectKey=money-transfer-like-cash-app-19113634-node-dev_harish \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://172.16.0.220:9000 \
  -Dsonar.login=32cf9325138f97409198a1a1373cd27f6c9cdded
