Feature: Bookstore

  @smoke @bookstore
  Scenario: Search books by keyword
    When the user searches books with keyword "Git"
    Then the search results should contain "Git"

  @bookstore
  Scenario: Add a book to the collection
    When the user adds book "Git Pocket Guide" to the collection
    Then book "Git Pocket Guide" should appear in the profile collection

  @bookstore
  Scenario: Remove a book from the collection
    When the user removes book "Git Pocket Guide" from the profile collection
    Then book "Git Pocket Guide" should no longer appear in the profile collection
