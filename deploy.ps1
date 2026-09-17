param([switch]$Preview)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$envFile = Join-Path $root ".env.deploy.local"

$env:PATH = "D:\New folder\Compressed\AI-Motion-Gen-Baraa\node;$env:PATH"

if (-not (Test-Path $envFile)) {
  Write-Host "ERROR: .env.deploy.local not found." -ForegroundColor Red
  exit 1
}

$token = (Get-Content $envFile | Where-Object { $_ -match "^VERCEL_DEPLOY_TOKEN=" }) -replace "^VERCEL_DEPLOY_TOKEN=", ""
if (-not $token) {
  Write-Host "ERROR: VERCEL_DEPLOY_TOKEN is empty in .env.deploy.local" -ForegroundColor Red
  exit 1
}

$vercelCmd = if ($Preview) { "npx vercel --yes --token $token" } else { "npx vercel deploy --prod --yes --token $token" }

Push-Location $root
try {
  if ($Preview) {
    Write-Host "== Preview deploy ==" -ForegroundColor Cyan
  } else {
    Write-Host "== Production deploy ==" -ForegroundColor Cyan
  }
  cmd /c $vercelCmd
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Deploy failed with exit code $LASTEXITCODE" -ForegroundColor Red
    exit $LASTEXITCODE
  }
} finally {
  Pop-Location
}
