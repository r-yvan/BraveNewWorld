#!/bin/bash
source ~/.nvm/nvm.sh
nvm use 26
CI=1 PRISMA_TELEMETRY_DISABLED=1 bunx prisma generate
