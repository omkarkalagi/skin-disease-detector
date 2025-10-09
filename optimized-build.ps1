# Optimized Build Script for Skin Disease Detector

# Set environment variables for better performance
$env:NODE_ENV = "production"
$env:NODE_OPTIONS = "--max_old_space_size=4096"

Write-Host "Starting optimized build process..." -ForegroundColor Cyan

# Clean node_modules cache if needed
# Write-Host "Cleaning node_modules cache..." -ForegroundColor Yellow
# Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue

# Run the build with optimized settings
Write-Host "Building application with optimized settings..." -ForegroundColor Green
npm run build

Write-Host "Build process completed!" -ForegroundColor Green
Write-Host "Check the build folder for the optimized output." -ForegroundColor Cyan