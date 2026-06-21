@api @bookstore-api @book-store-application
Feature: DemoQA Book Store API

  @smoke
  Scenario: Get the book catalog
    When the client requests the bookstore catalog
    Then the API response status should be 200
    And the response should contain a non-empty book catalog

  Scenario: Get a book by ISBN
    When the client requests the first book by ISBN
    Then the API response status should be 200
    And the response book should match the requested ISBN

  @negative
  Scenario: Get a book using an invalid ISBN
    When the client requests a book with an invalid ISBN
    Then the API response status should be 400

  Scenario: Authorize valid user credentials
    Given an API user account exists
    When the client checks whether the credentials are authorized
    Then the API response status should be 200
    And the authorization result should be true

  Scenario: Get an authorized user profile
    Given an API user account exists
    When the client gets the user profile with its token
    Then the API response status should be 200
    And the response should describe the API user

  @negative
  Scenario: Reject a user profile request without a token
    Given an API user account exists
    When the client gets the user profile without a token
    Then the API response status should be 401

  Scenario: Add a book to the user collection
    Given an API user account exists
    When the client adds the first catalog book to the collection
    Then the API response status should be 201
    And the added book should appear in the API user collection

  Scenario: Remove a book from the user collection
    Given an API user account exists
    And the first catalog book is in the API user collection
    When the client removes that book from the collection
    Then the API response status should be 204
    And the API user collection should be empty
