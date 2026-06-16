Feature: Bookstore

  @smoke @book-store-application @bookstore
  Scenario: Search books by keyword
    When the user searches books with keyword "Git"
    Then the search results should contain "Git"

  @book-store-application @bookstore @negative
  Scenario: Search books with a keyword that has no matches
    When the user searches books with keyword "zzzz-no-book-123"
    Then no bookstore search results should be displayed

  @book-store-application @bookstore
  Scenario: Add a book to the collection
    When the user adds book "Git Pocket Guide" to the collection
    Then book "Git Pocket Guide" should appear in the profile collection

  @book-store-application @bookstore
  Scenario: Remove a book from the collection
    When the user removes book "Git Pocket Guide" from the profile collection
    Then book "Git Pocket Guide" should no longer appear in the profile collection
