Feature: Web Tables

  @smoke @elements @web-tables
  Scenario: Add, edit, and delete a web table record
    Given the user is on the Web Tables page
    When the user adds a web table record
    And the user edits the web table record
    And the user deletes the web table record
    Then the web table record is removed

  @elements @web-tables @negative
  Scenario: Reject a web table record with an invalid email
    Given the user is on the Web Tables page
    When the user tries to add a web table record with an invalid email
    Then the invalid web table record is not added
