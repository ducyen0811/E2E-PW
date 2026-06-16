Feature: Tabs widget

  @smoke @widgets @tabs
  Scenario: Switch between available tabs
    Given the user is on the Tabs page
    Then the What tab content is displayed
    When the user opens the Origin tab
    Then the Origin tab content is displayed
    When the user opens the Use tab
    Then the Use tab content is displayed
