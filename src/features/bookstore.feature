Feature: Book Store

  @smoke @bookstore
  Scenario: Search books by keyword
    When user searches book with keyword "Git"
    Then search results should contain "Git"

  @bookstore
  Scenario: Add a book to collection
    When user adds book "Git Pocket Guide" to collection
    Then the book "Git Pocket Guide" should appear in profile collection

  @bookstore
  Scenario: Remove a book from collection
    When user removes book "Git Pocket Guide" from profile collection
    Then the book "Git Pocket Guide" should not appear in profile collection
