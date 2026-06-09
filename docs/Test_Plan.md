# Ke Hoach Kiem Thu

## 1. Muc tieu

Xay dung va duy tri bo test end-to-end cho website DemoQA bang Playwright, Cucumber va TypeScript.

Muc tieu chinh:

- Kiem tra cac luong nguoi dung quan trong da co trong repo.
- Giu code test gon va de bao tri theo Page Object Model.
- Ho tro chay test tren desktop va mobile.
- Co du test case manual de hoc, review va tu dong hoa dan.
- Khi test fail thi de debug bang report va screenshot.

## 2. Pham vi

### Trong pham vi

| Feature/Module | Trang thai hien tai | Muc tieu coverage |
|----------------|---------------------|-------------------|
| Authentication | Da bat dau | Login thanh cong, login that bai, logout, register thanh cong, register that bai |
| Bookstore | Da bat dau | Tim sach, mo chi tiet sach, them sach, xoa sach, kiem tra sach trong profile |
| Practice Form | Da bat dau | Gui form hop le, kiem tra modal da submit, them negative case sau |
| Browser Windows | Da bat dau | Mo tab moi, mo window moi, mo message window |
| Desktop layout | Da bat dau | Chay smoke va regression tren desktop |
| Mobile layout | Da bat dau | Chay cac smoke case quan trong tren mobile |
| Reporting | Da bat dau | Tao Cucumber HTML/JSON report va dinh kem screenshot khi fail |

### Ngoai pham vi

| Feature/Module | Ly do |
|----------------|-------|
| Visual regression testing | Chua can thiet khi dang hoc core E2E flow |
| Performance/load testing | Repo hien tai tap trung vao functional E2E test |
| Cross-browser matrix | Driver hien tai chi dung Chromium |
| API-only testing | Framework hien tai tap trung vao UI |
| Full DemoQA site coverage | Se mo rong dan sau khi cac module hien tai on dinh |

## 3. Moi truong kiem thu

| Hang muc | Gia tri |
|----------|---------|
| Application URL | `https://demoqa.com` |
| Browser | Chromium |
| Desktop viewport | 1440 x 900 |
| Mobile profile | iPhone 14 |
| Test framework | Playwright + Cucumber + TypeScript |
| Kieu test | BDD voi Vietnamese Gherkin |
| Cau hinh local | `.env` |
| Report output | `reports/json`, `reports/html`, `reports/screenshots` |
| Environment | Local |

## 4. Test data

| Data | Mo ta | Nguon/Owner |
|------|------|-------------|
| DemoQA account | Account duoc tao dong cho login/bookstore flow | Automation helper |
| Valid login data | Username/password tu account da tao | `src/test-data/user.ts` / world state |
| Invalid login password | Mat khau sai cho negative login scenario | Test code |
| Valid register data | First name, last name, username, password | Test code/helper |
| Invalid register data | Input khong hop le cho register negative scenario | Test code |
| Practice form data | Name, email, gender, mobile | `src/steps/forms.step.ts` |
| Book title | `Git Pocket Guide` | Feature file |
| Search keyword | `Git` | Feature file |

## 5. Chien luoc kiem thu

### Cac lop automation

| Lop | Trach nhiem | Vi du |
|-----|-------------|-------|
| Feature file | Mo ta scenario de doc theo nghiep vu | `browser-windows.feature` |
| Step definition | Noi cau Gherkin voi code | `browser-windows.step.ts` |
| Page factory | Chon page object desktop/mobile | `PageFactory.browserWindows(this.page)` |
| Page object contract | Khai bao cac method cua feature | `browser-windows.page.ts` |
| Page implementation | Chua locator/action/assertion Playwright that | `browser-windows.desktop.ts` |
| Hooks/world | Quan ly browser lifecycle va state cua scenario | `before.ts`, `after.ts`, `custom.world.ts` |

### Chien luoc tag

| Tag | Cach dung |
|-----|----------|
| `@smoke` | Cac case nhanh de kiem tra tinh nang quan trong con chay |
| `@auth` | Scenario lien quan authentication |
| `@login` | Scenario login |
| `@logout` | Scenario logout |
| `@register` | Scenario dang ky |
| `@negative` | Scenario invalid input hoac expected failure |
| `@bookstore` | Scenario bookstore |
| `@forms` | Scenario practice form |
| `@browser-windows` | Scenario tab/window moi |
| `@single` | Test nen chay tuan tu |
| `@parallel` | Test co the chay song song |

### Chien luoc chay test

| Kieu chay | Lenh | Khi nao dung |
|-----------|------|--------------|
| Chay full local | `npm run test` | Truoc khi ket thuc mot thay doi lon |
| Chay desktop | `npm run test:desktop` | Verify mac dinh o local |
| Chay mobile | `npm run test:mobile` | Sau khi sua page object/factory |
| Chay auth | `npm run test:auth:report` | Sau khi sua login/register/logout |
| Chay bookstore | `npm run test:bookstore:report` | Sau khi sua bookstore/profile |
| Chay forms | `npm run test:forms:report` | Sau khi sua practice form |
| Chay browser windows | `npx cucumber-js --tags "@browser-windows"` | Sau khi sua logic popup/window |
| Chay smoke | `npx cucumber-js --tags "@smoke"` | Kiem tra nhanh cac flow quan trong |

## 6. Danh sach test case du kien

Dung phan nay lam roadmap cho `docs/Manual_Test_Cases.xlsx` va automation sau nay.

### Authentication

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| AUTH-001 | High | Login thanh cong voi account hop le | Da automation |
| AUTH-002 | High | Login that bai voi mat khau sai | Da automation |
| AUTH-003 | Medium | Login that bai khi username rong | Da automation |
| AUTH-004 | Medium | Login that bai khi password rong | Da automation |
| AUTH-005 | High | Logout thanh cong sau khi login | Da automation |
| AUTH-006 | High | Register thanh cong voi data hop le | Da automation |
| AUTH-007 | Medium | Register that bai voi input khong hop le | Da automation |
| AUTH-008 | Medium | Register that bai khi bo trong required fields | Du kien |

### Bookstore

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| BOOK-001 | High | Tim sach theo keyword va kiem tra ket qua | Da automation |
| BOOK-002 | High | Mo trang chi tiet sach theo title | Da automation mot phan |
| BOOK-003 | High | Them sach vao collection va kiem tra trong profile | Da automation |
| BOOK-004 | High | Xoa sach khoi collection va kiem tra sach bien mat | Da automation |
| BOOK-005 | Medium | Tim sach voi keyword khong co ket qua | Du kien |
| BOOK-006 | Medium | Them sach khi chua login thi phai yeu cau authentication | Du kien |

### Practice Form

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| FORM-001 | High | Submit practice form voi required data hop le | Da automation |
| FORM-002 | High | Modal sau submit hien thi dung name/email/gender/mobile | Da automation |
| FORM-003 | Medium | Validate required field khi first name rong | Du kien |
| FORM-004 | Medium | Validate required field khi last name rong | Du kien |
| FORM-005 | Medium | Validate required field khi chua chon gender | Du kien |
| FORM-006 | Medium | Mobile number khong chap nhan do dai sai | Du kien |

### Browser Windows

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| WIN-001 | High | Mo tab moi va kiem tra heading cua sample page | Da automation |
| WIN-002 | High | Mo window moi va kiem tra heading cua sample page | Da automation |
| WIN-003 | High | Mo message window va kiem tra message text | Da automation |
| WIN-004 | Medium | Trang Browser Windows van dung duoc sau khi popup dong | Da automation |

### Framework/Infrastructure

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| FW-001 | High | Scenario fail thi co attach screenshot | Da bat dau |
| FW-002 | Medium | HTML report duoc tao sau khi run test | Da bat dau |
| FW-003 | Medium | Factory tra ve dung page object desktop/mobile | Da bat dau |
| FW-004 | Medium | Relative navigation hoat dong voi `baseURL` | Da bat dau |

## 7. Dieu kien dau vao

- `.env` da cau hinh `BASE_URL=https://demoqa.com`.
- Da cai dependency bang `npm install`.
- Website DemoQA truy cap duoc.
- Helper tao account DemoQA hoat dong cho auth/bookstore scenario.
- Feature can test co expected result ro rang.
- Page object da co hoac da duoc len ke hoach truoc khi viet step logic.

## 8. Dieu kien ket thuc

- Tat ca scenario `@smoke` pass tren desktop.
- Cac flow quan trong cua auth, bookstore, forms va browser-window pass.
- Page object moi di theo pattern cua repo: abstract page + desktop/mobile implementation neu can.
- Khi test fail co bang chung qua screenshot/report.
- Bug da biet duoc ghi theo format `docs/Bug_Report_Template.md` hoac duoc chap nhan la limitation.
- File manual test case duoc cap nhat cho scenario moi duoc automation.

## 9. Rui ro

| Rui ro | Anh huong | Cach giam thieu |
|--------|-----------|-----------------|
| DemoQA cham hoac khong on dinh | Test fail khong deu | Tang timeout dung cho vi tri can thiet va giu selector on dinh |
| Ads/overlay chan click | Form/bookstore test co the fail | Dung `scrollIntoViewIfNeeded`, selector on dinh, chi force click khi co ly do |
| Shared account state anh huong bookstore test | Add/remove book co the xung dot | Tao/cleanup account theo scenario neu co the |
| Desktop va mobile layout khac nhau | Mobile test fail voi selector desktop | Giu PageFactory va page object mobile rieng |
| Miss popup event | Browser-window test bi treo | Luon goi `waitForEvent('popup')` truoc khi click |
| Step definition qua dai | Code test kho bao tri | De UI logic trong page object |

## 10. Deliverables

| Deliverable | Path |
|-------------|------|
| Manual test cases | `docs/Manual_Test_Cases.xlsx` |
| Test plan | `docs/Test_Plan.md` |
| Bug report template | `docs/Bug_Report_Template.md` |
| Feature files | `src/features/` |
| Step definitions | `src/steps/` |
| Page objects | `src/pages/` |
| Test reports | `reports/html/`, `reports/json/` |
| Screenshots | `reports/screenshots/` |

## 11. Thu tu nen code tiep

Nen di theo thu tu nay khi viet automation tiep:

1. On dinh cac smoke test hien tai tren desktop.
2. Dien `Manual_Test_Cases.xlsx` theo cac test case ID o tren.
3. Them negative case con thieu cho login va register.
4. Them negative validation case cho practice form.
5. Them edge case cho bookstore, vi du search khong co ket qua va add book khi chua login.
6. Chay lai smoke suite tren mobile va chi fix nhung khac biet layout that su.
7. Gan `@single` cho test dung chung account/state neu parallel gay xung dot.
8. Cap nhat README khi them feature folder, script hoac tag moi.
