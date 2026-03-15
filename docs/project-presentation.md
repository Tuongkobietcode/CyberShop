# CyberShop - Nội dung bài thuyết trình dự án

> File này được viết theo định dạng Markdown để có thể dùng trực tiếp khi làm slide PowerPoint, Google Slides hoặc thuyết trình từ Markdown.

## Slide 1 - Giới thiệu đề tài

**Tên dự án:** CyberShop  
**Loại dự án:** Nền tảng thương mại điện tử monorepo  
**Thành phần chính:**
- User app cho khách hàng
- Admin app cho quản trị viên
- API backend xử lý dữ liệu và xác thực

**Thông điệp mở đầu:**  
CyberShop là mô hình ecommerce hoàn chỉnh ở mức demo, cho phép mô phỏng cả trải nghiệm mua hàng của khách và quy trình vận hành của người quản trị trên cùng một hệ thống.

## Slide 2 - Bài toán đặt ra

Trong một hệ thống bán hàng trực tuyến, doanh nghiệp cần:
- Giới thiệu sản phẩm một cách trực quan
- Hỗ trợ khách hàng tìm kiếm, xem chi tiết, đặt hàng
- Quản lý đơn hàng, sản phẩm, danh mục, khách hàng
- Theo dõi tổng quan kinh doanh trên dashboard

**Vấn đề:**  
Nếu chỉ xây một giao diện bán hàng mà không có dashboard quản trị và backend đồng bộ, hệ thống sẽ không phục vụ được quy trình nghiệp vụ thực tế.

## Slide 3 - Mục tiêu dự án

CyberShop được xây dựng với các mục tiêu:
- Tạo hệ thống ecommerce full-stack có kiến trúc rõ ràng
- Tách biệt giao diện khách hàng, giao diện admin và backend API
- Hỗ trợ các luồng cơ bản: đăng nhập, xem sản phẩm, giỏ hàng, thanh toán, quản lý đơn hàng
- Dễ mở rộng thêm module sau này như coupon, review moderation, phân quyền chi tiết

## Slide 4 - Kiến trúc tổng thể

CyberShop sử dụng mô hình **monorepo** gồm 3 ứng dụng:

1. **`apps/user`**
   Giao diện dành cho khách hàng.
2. **`apps/admin`**
   Giao diện dành cho quản trị viên.
3. **`apps/api`**
   Backend xây dựng bằng Express và MongoDB.

**Lợi ích của monorepo:**
- Quản lý tập trung toàn bộ hệ thống
- Dễ tái sử dụng tài nguyên chung
- Đồng bộ API và giao diện nhanh hơn
- Thuận tiện cho việc demo và bảo trì

## Slide 5 - Công nghệ sử dụng

**Frontend user/admin**
- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Axios

**Backend**
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser, CORS, Helmet, Morgan

**Dữ liệu và tài nguyên**
- Shared image assets trong `shared/assets/images`
- Seed script để tạo dữ liệu mẫu cho sản phẩm, danh mục, đơn hàng, tài khoản

## Slide 6 - Chức năng phía khách hàng

Ứng dụng `user` cung cấp các chức năng chính:
- Đăng ký, đăng nhập tài khoản khách hàng
- Xem trang chủ, giới thiệu, blog, liên hệ
- Duyệt danh sách sản phẩm
- Tìm kiếm, lọc, sắp xếp sản phẩm
- Xem chi tiết sản phẩm
- Thêm vào wishlist
- Thêm vào giỏ hàng
- Thanh toán theo các bước: địa chỉ -> vận chuyển -> thanh toán
- Xem thông tin cá nhân

**Lưu ý nghiệp vụ:**
- Khách chưa đăng nhập không được thêm vào wishlist, giỏ hàng và không được checkout
- Các route quan trọng được bảo vệ bằng cơ chế yêu cầu đăng nhập

## Slide 7 - Chức năng phía quản trị

Ứng dụng `admin` hỗ trợ:
- Đăng nhập quản trị
- Dashboard tổng quan
- Quản lý đơn hàng
- Quản lý khách hàng
- Quản lý danh mục
- Quản lý sản phẩm
- Tạo sản phẩm mới
- Theo dõi giao dịch

**Các module đang để mở rộng thêm:**
- Coupon management
- Product media
- Product reviews moderation
- Brands
- Control authority / RBAC chi tiết

Điều này cho thấy dự án đã có khung hệ thống rõ ràng và sẵn sàng phát triển tiếp.

## Slide 8 - Chức năng backend API

Backend cung cấp các nhóm API:
- **Health**: kiểm tra trạng thái hệ thống
- **Auth**: đăng nhập admin, refresh token, logout
- **Categories**: lấy danh mục và CRUD danh mục cho admin
- **Products**: lấy danh sách sản phẩm, chi tiết sản phẩm, CRUD sản phẩm
- **Customers**: lấy danh sách và chi tiết khách hàng
- **Orders**: tạo đơn hàng và quản lý đơn hàng
- **Dashboard**: thống kê tổng quan
- **Contact**: tiếp nhận thông tin liên hệ

**Điểm nổi bật:**
- API được tách module rõ ràng theo domain
- Có middleware cho auth admin và customer
- Có xử lý lỗi và not-found tập trung
- Có tài nguyên public cho ảnh dùng chung

## Slide 9 - Luồng hoạt động của hệ thống

**Luồng khách hàng:**
1. Đăng ký hoặc đăng nhập
2. Xem danh sách sản phẩm
3. Xem chi tiết sản phẩm
4. Thêm vào giỏ hàng
5. Nhập địa chỉ giao hàng
6. Chọn phương thức vận chuyển
7. Chọn thanh toán
8. Tạo đơn hàng

**Luồng admin:**
1. Đăng nhập admin
2. Theo dõi dashboard
3. Quản lý sản phẩm và danh mục
4. Theo dõi đơn hàng, khách hàng, giao dịch

## Slide 10 - Dữ liệu và bảo mật

**Dữ liệu chính trong hệ thống:**
- Admin
- Customer
- Category
- Product
- Order
- Contact
- Refresh token

**Bảo mật và vận hành:**
- Xác thực bằng JWT
- Tách quyền admin và customer
- CORS cho phép đúng origin hợp lệ
- Helmet tăng cường bảo mật HTTP
- Cookie và refresh token hỗ trợ phiên đăng nhập

## Slide 11 - Ưu điểm của dự án

- Kiến trúc tách lớp rõ ràng giữa frontend và backend
- Monorepo giúp phát triển đồng bộ
- Có đầy đủ 2 vai trò nghiệp vụ: khách hàng và admin
- Có seed dữ liệu để demo nhanh
- Có dashboard và quy trình đặt hàng thực tế
- Dễ mở rộng thành hệ thống ecommerce hoàn chỉnh

## Slide 12 - Hạn chế hiện tại

- Chưa có module coupon thực tế
- Chưa có phân quyền chi tiết theo vai trò admin
- Chưa có moderation cho review
- Chưa có quản lý media chuyên biệt
- Chưa thấy test tự động được khai báo ở root workspace

Hạn chế này phù hợp với mục tiêu hiện tại là xây dựng bản demo full-stack có thể trình bày và mở rộng sau.

## Slide 13 - Hướng phát triển

Trong giai đoạn tiếp theo, có thể bổ sung:
- Tích hợp thanh toán thật
- Quản lý tồn kho nâng cao
- Quản lý coupon và khuyến mãi
- Hệ thống review và duyệt đánh giá
- Phân quyền RBAC chi tiết
- Upload ảnh và media library
- Viết test API và frontend
- Docker hóa hệ thống để triển khai dễ dàng hơn

## Slide 14 - Demo đề xuất khi thuyết trình

**Kịch bản demo ngắn gọn:**
1. Đăng nhập bằng tài khoản customer
2. Vào trang sản phẩm, lọc và xem chi tiết
3. Thêm sản phẩm vào giỏ hàng
4. Đi qua các bước checkout
5. Đăng xuất và đăng nhập admin
6. Mở dashboard
7. Kiểm tra danh sách đơn hàng vừa tạo
8. Xem module quản lý sản phẩm hoặc khách hàng

**Tài khoản demo:**
- Admin: `admin@cybershop.com` / `Admin@123456`
- Customer: `minhanh@cybershop.com` / `Customer@123`

## Slide 15 - Kết luận

CyberShop là dự án ecommerce full-stack có cấu trúc tốt, phân tách rõ user app, admin app và API backend. Dự án đáp ứng được bài toán trình bày quy trình mua hàng và vận hành hệ thống quản trị, đồng thời còn đủ dư địa để phát triển thành sản phẩm hoàn chỉnh trong tương lai.

## Phần phụ - Tóm tắt nhanh để nói trong 1 phút

CyberShop là hệ thống thương mại điện tử được xây dựng theo kiến trúc monorepo, gồm giao diện khách hàng, trang quản trị và backend API. Dự án hỗ trợ từ duyệt sản phẩm, giỏ hàng, checkout đến quản lý đơn hàng, sản phẩm, khách hàng và dashboard. Điểm mạnh của dự án là kiến trúc rõ ràng, công nghệ hiện đại, dễ demo, dễ mở rộng, phù hợp cho bài tập lớn, đồ án môn học hoặc demo portfolio full-stack.
