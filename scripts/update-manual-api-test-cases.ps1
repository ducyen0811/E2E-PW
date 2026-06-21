param(
  [string]$WorkbookPath = 'docs/Manual_Test_Cases.xlsx'
)

$ErrorActionPreference = 'Stop'
$resolvedWorkbook = (Resolve-Path -LiteralPath $WorkbookPath).Path
$workspaceRoot = (Resolve-Path -LiteralPath '.').Path
if (-not $resolvedWorkbook.StartsWith($workspaceRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Workbook must be inside the workspace: $workspaceRoot"
}

$tempRoot = Join-Path $env:TEMP ("manual-test-cases-" + [guid]::NewGuid().ToString('N'))
$expandedDir = Join-Path $tempRoot 'expanded'
$updatedWorkbook = Join-Path $tempRoot 'Manual_Test_Cases.updated.xlsx'

$cases = @(
  @('API-001', 'Book Store API', 'High', 'Smoke', 'Lay danh sach sach tu Book Store API', 'DemoQA API dang hoat dong', "1. Gui GET /BookStore/v1/Books`n2. Kiem tra HTTP status`n3. Kiem tra danh sach books", 'Tra ve 200; books la mang khong rong; moi sach co isbn, title va author', 'GET /BookStore/v1/Books', 'Ready', 'Automated', '@api @bookstore-api @smoke'),
  @('API-002', 'Book Store API', 'High', 'Positive', 'Lay chi tiet sach theo ISBN hop le', 'Catalog co it nhat mot sach', "1. Lay ISBN dau tien tu catalog`n2. Gui GET /BookStore/v1/Book voi ISBN`n3. So sanh response voi catalog", 'Tra ve 200; isbn va title khop voi sach da yeu cau', 'ISBN dau tien trong catalog', 'Ready', 'Automated', '@api @bookstore-api'),
  @('API-003', 'Book Store API', 'High', 'Negative', 'Tu choi ISBN khong hop le', 'DemoQA API dang hoat dong', "1. Gui GET /BookStore/v1/Book`n2. Truyen ISBN=invalid-isbn`n3. Kiem tra HTTP status", 'Tra ve 400 cho ISBN khong hop le', 'ISBN: invalid-isbn', 'Ready', 'Automated', '@api @bookstore-api @negative'),
  @('API-004', 'Account API', 'High', 'Positive', 'Xac thuc credentials cua API user hop le', 'API user moi da duoc tao va token da duoc sinh', "1. Gui POST /Account/v1/Authorized`n2. Truyen userName va password hop le`n3. Kiem tra response", 'Tra ve 200 va response boolean true', 'Tai khoan duoc tao dong trong test', 'Ready', 'Automated', '@api @bookstore-api'),
  @('API-005', 'Account API', 'High', 'Positive', 'Lay profile bang Bearer token hop le', 'API user moi da duoc tao va co token', "1. Gui GET /Account/v1/User/{userId}`n2. Gan Authorization Bearer token`n3. Kiem tra thong tin user", 'Tra ve 200; userId va username khop; books la mot mang', 'userId va token duoc tao dong', 'Ready', 'Automated', '@api @bookstore-api'),
  @('API-006', 'Account API', 'High', 'Security', 'Tu choi lay profile khi khong co token', 'API user moi da duoc tao', "1. Gui GET /Account/v1/User/{userId}`n2. Khong gui Authorization header`n3. Kiem tra HTTP status", 'Tra ve 401 Unauthorized', 'userId hop le; khong co token', 'Ready', 'Automated', '@api @bookstore-api @negative'),
  @('API-007', 'Book Store API', 'High', 'Positive', 'Them sach vao collection cua API user', 'API user moi da duoc tao va co token; catalog co sach', "1. Lay sach dau tien trong catalog`n2. Gui POST /BookStore/v1/Books voi userId va isbn`n3. Lay profile de xac minh", 'POST tra ve 201; sach da them xuat hien trong books cua profile', 'userId, token va isbn duoc tao/lay dong', 'Ready', 'Automated', '@api @bookstore-api'),
  @('API-008', 'Book Store API', 'High', 'Positive', 'Xoa sach khoi collection cua API user', 'API user co mot sach trong collection va co token', "1. Gui DELETE /BookStore/v1/Book voi isbn va userId`n2. Kiem tra HTTP status`n3. Lay profile de xac minh", 'DELETE tra ve 204; collection cua user rong', 'userId, token va isbn duoc tao/lay dong', 'Ready', 'Automated', '@api @bookstore-api')
)

try {
  New-Item -ItemType Directory -Path $expandedDir -Force | Out-Null
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [System.IO.Compression.ZipFile]::ExtractToDirectory($resolvedWorkbook, $expandedDir)

  $sheetPath = Join-Path $expandedDir 'xl/worksheets/sheet1.xml'
  [xml]$sheet = Get-Content -LiteralPath $sheetPath
  $ns = New-Object System.Xml.XmlNamespaceManager($sheet.NameTable)
  $spreadsheetNs = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'
  $ns.AddNamespace('m', $spreadsheetNs)
  $sheetData = $sheet.SelectSingleNode('/m:worksheet/m:sheetData', $ns)

  $existingIds = @{}
  foreach ($cell in $sheet.SelectNodes('/m:worksheet/m:sheetData/m:row/m:c[1]', $ns)) {
    if ($cell.t -eq 'inlineStr') { $existingIds[$cell.is.InnerText] = $true }
  }

  $lastRow = [int](($sheet.SelectNodes('/m:worksheet/m:sheetData/m:row', $ns) | Select-Object -Last 1).r)
  foreach ($case in $cases) {
    if ($existingIds.ContainsKey($case[0])) { continue }
    $lastRow++
    $row = $sheet.CreateElement('row', $spreadsheetNs)
    $row.SetAttribute('r', [string]$lastRow)
    $row.SetAttribute('spans', '1:12')
    $row.SetAttribute('ht', '72')
    $row.SetAttribute('customHeight', '1')

    for ($columnIndex = 0; $columnIndex -lt 12; $columnIndex++) {
      $columnLetter = [char]([int][char]'A' + $columnIndex)
      $cell = $sheet.CreateElement('c', $spreadsheetNs)
      $cell.SetAttribute('r', "$columnLetter$lastRow")
      $cell.SetAttribute('t', 'inlineStr')
      $cell.SetAttribute('s', '4')
      $inlineString = $sheet.CreateElement('is', $spreadsheetNs)
      $text = $sheet.CreateElement('t', $spreadsheetNs)
      if ($case[$columnIndex] -match '^\s|\s$|[\r\n]') {
        [void]$text.SetAttribute('xml:space', 'preserve')
      }
      $text.InnerText = $case[$columnIndex]
      [void]$inlineString.AppendChild($text)
      [void]$cell.AppendChild($inlineString)
      [void]$row.AppendChild($cell)
    }
    [void]$sheetData.AppendChild($row)
  }

  $sheet.SelectSingleNode('/m:worksheet/m:dimension', $ns).SetAttribute('ref', "A1:L$lastRow")
  $sheet.SelectSingleNode('/m:worksheet/m:autoFilter', $ns).SetAttribute('ref', "A2:L$lastRow")
  $sheet.Save($sheetPath)

  [System.IO.Compression.ZipFile]::CreateFromDirectory($expandedDir, $updatedWorkbook)
  Copy-Item -LiteralPath $resolvedWorkbook -Destination "$resolvedWorkbook.bak" -Force
  Copy-Item -LiteralPath $updatedWorkbook -Destination $resolvedWorkbook -Force
  Write-Output "Updated $resolvedWorkbook through row $lastRow"
}
finally {
  if (Test-Path -LiteralPath $tempRoot) {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force
  }
}
