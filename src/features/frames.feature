Feature: Frames

  @smoke @alerts-frame-windows @frames
  Scenario: Verify content inside both frames
    Given the user is on the Frames page
    Then both Frames page frames display the sample heading

  @alerts-frame-windows @frames
  Scenario: Verify large and small frame sizes
    Given the user is on the Frames page
    Then the first frame should be larger than the second frame

  @alerts-frame-windows @frames @state
  Scenario: Verify frame content remains stable after reload
    Given the user is on the Frames page
    When the user reloads the Frames page
    Then both Frames page frames display the sample heading
