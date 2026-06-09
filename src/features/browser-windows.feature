Feature: Browser windows

  @smoke @browser-windows
  Scenario: Open a new tab from the Browser Windows page
    Given the user is on the Browser Windows page
    When the user opens a new tab from the Browser Windows page
    Then the Browser Windows page remains visible

  @smoke @browser-windows
  Scenario: Open a new window from the Browser Windows page
    Given the user is on the Browser Windows page
    When the user opens a new window from the Browser Windows page
    Then the Browser Windows page remains visible

  @smoke @browser-windows
  Scenario: Open a new message window from the Browser Windows page
    Given the user is on the Browser Windows page
    When the user opens a new message window from the Browser Windows page
    Then the Browser Windows page remains visible
