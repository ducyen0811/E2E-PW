# Ke hoach kiem thu - E2E Playwright Automation Framework

## 1. Muc tieu

Tai lieu nay dung de dinh huong viec kiem thu va tu dong hoa cho project E2E Playwright tren DemoQA.

Muc tieu chinh:

- Kiem tra cac flow quan trong dang co trong repo.
- Giu test de doc, de sua va bam theo Page Object Model.
- Chay duoc tren desktop, sau do kiem tra lai cac case quan trong tren mobile.
- Co danh sach manual test case lam co so de review va automate tiep.
- Khi test fail co report hoac screenshot de debug nhanh hon.

## 2. Pham vi kiem thu

| Feature/Module | Trang thai | Noi dung can cover |
|----------------|------------|--------------------|
| Authentication | Dang co automation | Login thanh cong, login that bai, logout, register thanh cong, register that bai |
| Bookstore | Dang co automation | Tim sach, mo chi tiet sach, them sach vao collection, xoa sach khoi collection |
| Practice Form | Dang co automation | Submit form hop le va kiem tra modal sau khi submit |
| Browser Windows | Dang co automation | Mo tab moi, window moi va message window |
| Frames | Dang co automation | Kiem tra noi dung frame va nested frame |
| Desktop layout | Can duy tri | Smoke va regression chay on dinh tren desktop |
| Mobile layout | Can kiem tra them | Chay lai cac smoke case quan trong tren mobile |
| Reporting | Dang co cau hinh | Tao Cucumber report va luu screenshot khi scenario fail |

## 3. Moi truong kiem thu

| Hang muc | Gia tri |
|----------|---------|
| Application URL | `https://demoqa.com` |
| Browser | Chromium |
| Desktop viewport | 1440 x 900 |
| Mobile profile | iPhone 14 |
| Framework | Playwright + Cucumber + TypeScript |
| Kieu test | BDD voi English Gherkin |
| Cau hinh local | `.env` |
| Report output | `reports/json`, `reports/html`, `reports/screenshots` |
| Environment | Local |

## 4. Test data

| Data | Cach dung |
|------|-----------|
| DemoQA account | Tao account cho login va bookstore flow |
| Valid login data | Lay tu account da tao trong test |
| Invalid login password | Dung cho login negative case |
| Valid register data | First name, last name, username, password hop le |
| Invalid register data | Dung cho cac case register fail |
| Practice form data | Name, email, gender, mobile |
| Book title | `Git Pocket Guide` |
| Search keyword | `Git` |

## 5. Cach to chuc automation

Project dang di theo huong Cucumber + Page Object Model:

| Thanh phan | Vai tro |
|------------|---------|
| Feature file | Mo ta scenario bang Gherkin |
| Step definition | Noi Gherkin step voi code TypeScript |
| Page object | Chua locator, action va assertion cua tung page |
| Page factory | Chon dung page object cho desktop hoac mobile |
| Hooks/world | Quan ly browser, page va state cua scenario |
| Report | Luu ket qua run test va bang chung khi fail |

Nguyen tac khi viet them test:

- Step definition chi nen dieu phoi flow, khong nen chua qua nhieu UI logic.
- Locator va assertion nen nam trong page object.
- Neu desktop va mobile khac layout, tach implementation thay vi chen nhieu dieu kien trong step.
- Case nao dung chung account hoac state thi can can nhac tag `@single`.
- Sau khi them scenario moi, cap nhat manual test case neu scenario do co y nghia regression.

## 6. Tag su dung trong test

| Tag | Y nghia |
|-----|---------|
| `@smoke` | Case nhanh de check cac flow quan trong |
| `@auth` | Authentication |
| `@login` | Login |
| `@logout` | Logout |
| `@register` | Register |
| `@negative` | Case sai input hoac expected failure |
| `@bookstore` | Bookstore |
| `@forms` | Practice Form |
| `@browser-windows` | Browser Windows |
| `@frames` | Frames |
| `@nested-frames` | Nested Frames |
| `@single` | Nen chay tuan tu |
| `@parallel` | Co the chay song song |

## 7. Cach chay test

| Muc dich | Lenh |
|----------|------|
| Chay full local | `npm run test` |
| Chay desktop | `npm run test:desktop` |
| Chay mobile | `npm run test:mobile` |
| Chay auth co report | `npm run test:auth:report` |
| Chay bookstore co report | `npm run test:bookstore:report` |
| Chay forms co report | `npm run test:forms:report` |
| Chay browser windows | `npx cucumber-js --tags "@browser-windows"` |
| Chay smoke | `npx cucumber-js --tags "@smoke"` |

## 8. Danh sach test case

Danh sach nay la roadmap cho `docs/Manual_Test_Cases.xlsx` va automation sau nay.

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

### Frames

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| FRAME-001 | High | Kiem tra content trong ca hai frame | Da automation |
| FRAME-002 | Medium | Kiem tra frame lon va frame nho co kich thuoc dung | Da automation |
| FRAME-003 | High | Kiem tra content trong nested parent/child frames | Da automation |

### Framework/Infrastructure

| ID | Priority | Scenario | Trang thai |
|----|----------|----------|------------|
| FW-001 | High | Scenario fail thi co attach screenshot | Da bat dau |
| FW-002 | Medium | HTML report duoc tao sau khi run test | Da bat dau |
| FW-003 | Medium | Factory tra ve dung page object desktop/mobile | Da bat dau |
| FW-004 | Medium | Relative navigation hoat dong voi `baseURL` | Da bat dau |

## 9. Dieu kien dau vao

- `.env` da co `BASE_URL=https://demoqa.com`.
- Da cai dependency bang `npm install`.
- DemoQA truy cap duoc tai thoi diem chay test.
- Helper tao account DemoQA hoat dong cho auth/bookstore.
- Feature can test da co expected result ro rang.
- Page object da co san hoac da duoc len ke hoach truoc khi viet step.

## 10. Dieu kien ket thuc

- Cac scenario `@smoke` pass tren desktop.
- Flow chinh cua auth, bookstore, forms, browser windows va frames pass.
- Page object moi dung pattern cua repo.
- Khi test fail co screenshot hoac report de xem lai.
- Bug da biet duoc ghi vao `docs/Bug_Report_Template.md` hoac duoc chap nhan la limitation.
- Manual test case duoc cap nhat neu co scenario moi.

## 11. Rui ro

| Rui ro | Anh huong | Cach xu ly |
|--------|-----------|------------|
| DemoQA cham hoac khong on dinh | Test fail khong deu | Tang timeout dung cho noi can thiet va giu selector on dinh |
| Ads/overlay chan click | Click form/bookstore co the fail | Scroll dung vi tri, dung selector on dinh, chi force click khi co ly do |
| Account dung chung bi lech state | Bookstore add/remove co the fail | Tao account rieng hoac cleanup truoc/sau scenario |
| Desktop va mobile khac layout | Mobile test fail voi selector desktop | Dung PageFactory va mobile page object khi can |
| Popup event bi miss | Browser-window test bi treo | Dat `waitForEvent('popup')` truoc action click |
| Step definition qua dai | Kho bao tri | Dua UI logic ve page object |

## 12. Deliverables

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

## 13. Viec nen lam tiep

1. Chay lai smoke test tren desktop va fix case fail that su.
2. Cap nhat `Manual_Test_Cases.xlsx` theo cac ID trong test plan.
3. Them negative case con thieu cho login va register.
4. Them validation case cho practice form.
5. Them edge case cho bookstore: search khong co ket qua, add book khi chua login.
6. Chay lai smoke suite tren mobile.
7. Gan `@single` cho case dung chung account/state neu parallel gay loi.
8. Cap nhat README khi them feature, script hoac tag moi.
