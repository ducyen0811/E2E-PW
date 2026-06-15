Feature: Web Tables

  @smoke @elements @web-tables
  Scenario: Add, edit, and delete a web table record
    Given the user is on the Web Tables page
    When the user adds a web table record
    And the user edits the web table record
    And the user deletes the web table record
    Then the web table record is removed
