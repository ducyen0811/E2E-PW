# language: vi
Tính năng: Xác thực người dùng

  @smoke @auth @login
  Kịch bản: Đăng nhập thành công
    Khi người dùng đăng nhập bằng thông tin hợp lệ
    Thì người dùng đăng nhập thành công

  @auth @login @negative
  Kịch bản: Đăng nhập thất bại khi sai mật khẩu
    Khi người dùng đăng nhập bằng mật khẩu không hợp lệ
    Thì thông báo lỗi đăng nhập được hiển thị
    Và người dùng vẫn ở trang đăng nhập

  @auth @logout
  Kịch bản: Đăng xuất thành công
    Khi người dùng đăng xuất
    Thì người dùng được chuyển về trang đăng nhập

  @smoke @auth @register
  Kịch bản: Đăng ký thành công
    Khi người dùng đăng ký bằng thông tin hợp lệ
    Thì đăng ký thành công

  @auth @register @negative
  Kịch bản: Đăng ký thất bại khi email không hợp lệ
    Khi người dùng đăng ký bằng email không hợp lệ
    Thì thông báo lỗi đăng ký được hiển thị
