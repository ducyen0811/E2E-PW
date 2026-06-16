Feature: Accordian widget

  @smoke @widgets @accordian
  Scenario: Expand and collapse accordian sections
    Given the user is on the Accordian page
    Then the first accordian section is expanded by default
    When the user opens the second accordian section
    Then the second accordian section content is displayed
    When the user opens the third accordian section
    Then the third accordian section content is displayed
