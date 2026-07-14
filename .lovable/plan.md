# Plan: Đồng bộ spa2 view ↔ dashboard/manage + trang quản lý mới

## Phạm vi hiện trạng
- `src/sections/spa2/view/spa2-content-pages*.tsx` (6 file, ~22k dòng) chứa **60+** page view: about, services, service-details, blog, blog-details, careers, booking, contact, offers, feedback, promotions, branches, account, partners, treatments, before-after, faq, policy, gallery, membership, gift-card, wellness-package, skin-quiz, corporate, shop, sustainability, events, referral, app-download, special-occasions, home-service, skin-diary, mindfulness, medical-spa, spa-etiquette, loyalty-rewards, review, seasonal-package, nutrition, consultation, vip-room, package-builder, appointment, newsletter, press, affiliate, spa-finder, spa-menu, ingredient-guide, skin-school, therapist-profile, sleep-wellness, prenatal-spa, wellness-assessment, men-spa, hair-beauty, kids-spa, anti-aging, water-therapy, ayurveda, spa-hotel, community, training…
- `src/sections/dashboard/spa2/manage/*` đã có 16 view "chuyên biệt" + 1 `spa2-generic-manage-view.tsx` được cấu hình bằng `spa2-manage-configs.ts` (37 module dùng chung generic).
- Dữ liệu view đang **hard-code inline** trong mỗi content page → manage & view không share.

## Mục tiêu
1. **Tách data**: Toàn bộ mảng dữ liệu (services, blog posts, testimonials, gift cards, quizzes, branches, jobs, faqs, policies, …) chuyển sang `src/_mock/_spa2/*.ts`, export theo module.
2. **View đọc từ _mock**: Refactor 6 file content-pages để import data thay vì inline.
3. **Manage đọc từ _mock**: `spa2-manage-configs.ts` seed data lấy từ cùng nguồn _mock → luôn đồng bộ.
4. **Redesign manage layout** để đồng nhất "cảm giác" với view spa2 (teal palette `SPA2_TEAL`, bo góc mềm, header eyebrow + title, preview card mô phỏng lát cắt spa2 tương ứng bên cạnh bảng CRUD).
5. **Thêm 6 trang dashboard quản lý mới** cho các trang không phải "list": about, account, contact, home, services/:slug, blog/:slug — kiểu **singleton editor** (form chỉnh nội dung + preview cạnh bên) và **detail editor by slug** (services & blog).

## Kiến trúc mới
```text
src/
├── _mock/_spa2/
│   ├── index.ts            # re-export
│   ├── services.ts         # SPA2_SERVICES[]
│   ├── blog.ts             # SPA2_POSTS[]
│   ├── testimonials.ts
│   ├── branches.ts
│   ├── gift-cards.ts
│   ├── memberships.ts
│   ├── quizzes.ts          # skin-quiz
│   ├── policies.ts
│   ├── faqs.ts
│   ├── gallery.ts
│   ├── singletons.ts       # about/contact/home/account page content
│   └── … (1 file cho mỗi module còn lại)
├── sections/spa2/…         # import từ _mock, giữ UI cũ
└── sections/dashboard/spa2/manage/
    ├── spa2-manage-shell.tsx     # layout mới: header teal + PreviewPane + CrudPane
    ├── spa2-preview-pane.tsx     # nhúng preview đúng section spa2 tương ứng
    ├── spa2-generic-manage-view.tsx  # dùng shell mới
    ├── singleton/
    │   ├── spa2-singleton-editor.tsx  # form JSON-schema-lite
    │   └── configs.ts                 # about, contact, home, account
    └── detail/
        ├── spa2-service-detail-editor.tsx
        └── spa2-blog-detail-editor.tsx
```

## Trang mới (`src/pages/dashboard/manage/spa2/`)
- `home.tsx`            → chỉnh Hero + Services + About + Testimonials + Contact (singleton).
- `about.tsx`           → chỉnh eyebrow/title/description/features/gallery của Spa2About.
- `contact.tsx`         → chỉnh subtitle/phone/email/address/CTAs.
- `account.tsx`         → chỉnh profile mặc định, tabs, menu items.
- `services/[slug].tsx` → editor chi tiết cho từng dịch vụ (title, desc, duration, price, gallery, benefits, faqs).
- `blog/[slug].tsx`     → editor bài viết (title, cover, tags, content-blocks, author).
- `services/index.tsx`, `blog/index.tsx` cập nhật để linh động điều hướng vào detail editor.

## Redesign manage view
- Header: eyebrow teal + title lớn (Albert-like), khối mô tả module.
- Grid 2 cột (>=lg): cột trái = **preview** thu nhỏ section spa2 (iframe-less, render trực tiếp component với dữ liệu đang chỉnh); cột phải = CRUD table + toolbar tìm kiếm/filter/status.
- Row action: view drawer với layout gần giống card spa2 gốc.
- Form dialog: field render theo `FieldConfig`, hỗ trợ text/textarea/image/select/rich-text-lite, có nút "Duyệt" cho status workflow.

## Data flow
- Tất cả CRUD state lưu bằng `useState` (list local, seeded từ _mock). Ghi lại vào memory trong session (chưa nối Cloud) — tương thích code hiện tại.
- Ghi chú: nếu sau này cần persist, chỉ cần đổi hook `useSpa2Resource(key)` sang gọi Cloud.

## Chi tiết kỹ thuật
- Không đổi `src/integrations/supabase/client.ts`, không đổi routes ngoài việc bổ sung các đường dẫn mới.
- Thêm routes trong `src/routes/sections/dashboard-spa2.tsx`:
  - `manage/spa2/home`, `about`, `contact`, `account`
  - `manage/spa2/services/:slug`, `manage/spa2/blog/:slug`.
- `paths.dashboard.manage.spa2.*` bổ sung getter cho slug.
- Không đổi style toàn cục; chỉ tái sử dụng token teal đã có trong `spa2-data.ts`.

## Kích thước & thứ tự thực hiện
1. Tạo `_mock/_spa2/*` — trích dữ liệu từ 6 content-pages (từng module một, giữ nguyên nội dung tiếng Việt).
2. Refactor content-pages để import _mock (chỉ đổi mảng data, giữ JSX).
3. Cập nhật `spa2-manage-configs.ts` để lấy `seedData` từ _mock.
4. Tạo `spa2-manage-shell` + `PreviewPane` + refactor `spa2-generic-manage-view` để dùng shell.
5. Cập nhật 16 view chuyên biệt (services, blog, gallery, faq, …) sang shell mới.
6. Tạo singleton editor + 4 trang singleton (home/about/contact/account).
7. Tạo detail editor + routes cho services/:slug và blog/:slug.
8. Cập nhật routes + `paths`.

## Ghi chú quy mô
Đây là refactor lớn (~22k dòng nguồn tham chiếu, 60+ module). Tôi sẽ triển khai theo lô tuần tự và commit từng phần để bạn theo dõi tiến độ. Nếu bạn muốn thu hẹp phạm vi (ví dụ chỉ làm 6 trang mới + redesign shell, chưa refactor toàn bộ view → _mock), báo tôi trước khi bắt đầu.
