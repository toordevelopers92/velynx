Write-Host "Building Velynx packages..."
pnpm install
pnpm build

Write-Host "Packing CSS package..."
pnpm -C packages/core pack

Write-Host "Packing JS package..."
pnpm -C packages/js pack
