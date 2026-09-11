# BLACK-MAK Deploy — one command, zero token in chat/history.
# Usage: .\deploy.ps1            (production)
#        .\deploy.ps1 -Preview   (preview URL only)
#
# Token lives in .env.deploy.local (git-ignored). If missing, the script
# tells you exactly what to do — no guesswork.
param([switch]$Preview)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$envFile = Join-Path $root ".env.deploy.local"

if (-not (Test-Path $envFile)) {
  Write-Host "ERROR: .env.deploy.local not found." -ForegroundColor Red
  Write-Host "Create it with one line:"
  Write-Host '  VERCEL_DEPLOY_TOKEN=vcp_xxxxxxxx'
  Write-Host "Then re-run this script."
  exit 1
}

$token = (Get-Content $envFile | Where-Object { $_ -match "^VERCEL_DEPLOY_TOKEN=" }) -replace "^VERCEL_DEPLOY_TOKEN=", ""
if (-not $token) {
  Write-Host "ERROR: VERCEL_DEPLOY_TOKEN is empty in .env.deploy.local" -ForegroundColor Red
  exit 1
}

# Run vercel through cmd so its stderr banner doesn't poison PowerShell.
$vercelCmd = if ($Preview) { "vercel --yes --token $token" } else { "vercel deploy --prod --yes --token $token" }

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
