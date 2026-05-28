#!/bin/bash
source ~/.nvm/nvm.sh
nvm use 26

SERVICES=("services/entry-exit-service" "services/report-service" "services/auth-service")

for service in "${SERVICES[@]}"; do
  echo "Updating $service..."
  cd "$service"
  bun add -d prisma@latest
  bun add @prisma/client@latest
  CI=1 PRISMA_TELEMETRY_DISABLED=1 bunx prisma generate
  cd ../..
done
echo "All done!"
