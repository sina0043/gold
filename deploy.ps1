$projectName = "gold"
$branchName = "main"

if (Test-Path "docs") {
    Remove-Item -Recurse -Force "docs"
}

ng build --configuration=production --base-href="/$projectName/"

New-Item -ItemType Directory -Path "docs"

$csrFile = "dist\$projectName\browser\index.csr.html"
$indexFile = "docs\index.html"

if (Test-Path $csrFile) {
    Copy-Item $csrFile $indexFile
} else {
    exit
}

Copy-Item $indexFile "docs/404.html"

Copy-Item -Recurse -Force "dist\$projectName\browser\*" "docs/"

git add .
git commit -m "deploy Angular SPA to GitHub Pages"
git push -u origin $branchName