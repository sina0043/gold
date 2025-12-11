deploy.ps1# نام پروژه و شاخه GitHub خودت
$projectName = "gold"
$branchName = "main"

# مرحله 1: پاک کردن پوشه docs قدیمی
if (Test-Path "docs") {
    Write-Host "پاک کردن پوشه docs قدیمی..."
    Remove-Item -Recurse -Force "docs"
}

# مرحله 2: Build پروژه Angular
Write-Host "شروع Build پروژه..."
ng build --configuration=production --base-href="/$projectName/"

# مرحله 3: ساخت پوشه docs جدید
Write-Host "ساخت پوشه docs جدید..."
New-Item -ItemType Directory -Path "docs"

# مرحله 4: rename index.csr.html → index.html
$csrFile = "dist\$projectName\browser\index.csr.html"
$indexFile = "docs\index.html"

if (Test-Path $csrFile) {
    Write-Host
    Copy-Item $csrFile $indexFile
} else {
    Write-Host
    exit
}

# مرحله 5: ساخت 404.html
Copy-Item $indexFile "docs/404.html"

# مرحله 6: کپی بقیه فایل‌ها و پوشه‌ها
Write-Host "کپی همه فایل‌های build به docs..."
Copy-Item -Recurse -Force "dist\$projectName\browser\*" "docs/"

# مرحله 7: Commit و Push
Write-Host "اضافه کردن تغییرات به Git..."
git add .

Write-Host "ساخت کامیت..."
git commit -m "deploy Angular SPA to GitHub Pages"

Write-Host "پوش به شاخه اصلی GitHub..."
git push -u origin $branchName

Write-Host "`n🚀 همه مراحل انجام شد! سایت شما باید روی:"
Write-Host "https://sina0043.github.io/$projectName/"
