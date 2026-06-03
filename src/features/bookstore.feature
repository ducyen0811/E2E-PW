# language: vi
Tính năng: Cửa hàng sách

  @smoke @bookstore
  Kịch bản: Tìm sách theo từ khóa
    Khi người dùng tìm sách với từ khóa "Git"
    Thì kết quả tìm kiếm phải chứa "Git"

  @bookstore
  Kịch bản: Thêm sách vào bộ sưu tập
    Khi người dùng thêm sách "Git Pocket Guide" vào bộ sưu tập
    Thì sách "Git Pocket Guide" phải xuất hiện trong bộ sưu tập hồ sơ

  @bookstore
  Kịch bản: Xóa sách khỏi bộ sưu tập
    Khi người dùng xóa sách "Git Pocket Guide" khỏi bộ sưu tập hồ sơ
    Thì sách "Git Pocket Guide" không còn xuất hiện trong bộ sưu tập hồ sơ
