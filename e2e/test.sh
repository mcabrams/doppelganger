#!/bin/bash
# Expected to be run outside of docker after some form of
# `docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d` has
# been run - it's exit code matches whether tests passed or failed

docker-compose -f docker-compose.yml -f docker-compose.test.yml run cypress cypress run
