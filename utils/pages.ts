//general
export const BUTTON_CLOSE = "//button[contains(., 'Close')]";
export const BUTTON_CONTINUE = "//button[contains(., 'Continue')]";
export const BUTTON_DELETE = "//button[contains(., 'Delete')]";
export const BUTTON_GO_BACK = "//button[contains(., 'Go back')]";
export const BUTTON_SELECT = "//button[contains(., 'Select')]";
export const DIALOG_OVERLAY = "//div[@role='dialog']";

//login
export const BUTTON_LOGIN = "//button[contains(., 'Login')]";
export const INPUT_EMAIL = "//input[@id='email']";
export const INPUT_PASSWORD = "//input[@id='password']";

//home
export const BUTTON_NEW_REQUEST = "//a[@type='button' and contains(., 'New request')]";

//waypoints
export const BUTTON_ROAD = "//button[contains(., 'Road')]";
export const BUTTON_AIR = "//button[contains(., 'Air')]";
export const BUTTON_SEA = "//button[contains(., 'Sea')]";
export const BUTTON_RAIL = "//button[contains(., 'Rail')]";
export const BUTTON_INTERMODAL = "//button[contains(., 'Intermodal')]";
export const BUTTON_REMOVE = "//button[contains(., 'Remove')]";
export const CHECKBOX_SAVE_ADDRESS = "//div[contains(@class,'form-check') and contains(., 'Save address to directory')]//input[@type='checkbox']";
export const INPUT_EARLIEST_PICKUP_TIME = "//div[@class='validation-input' and label[contains(.,'Earliest pickup time')]]//input[@data-test-id='dp-input']";
export const INPUT_LATEST_PICKUP_TIME = "//div[@class='validation-input' and label[contains(.,'Latest pickup time')]]//input[@data-test-id='dp-input']";
export const INPUT_EARLIEST_DELIVERY_TIME = "//div[@class='validation-input' and label[contains(.,'Earliest delivery time')]]//input[@data-test-id='dp-input']";
export const INPUT_LATEST_DELIVERY_TIME = "//div[@class='validation-input' and label[contains(.,'Latest delivery time')]]//input[@data-test-id='dp-input']";
export const INPUT_CITY = "//div[@class='validation-input' and label[contains(.,'City')]]//input[@type='text']";
export const INPUT_COUNTRY = "//div[@class='validation-input' and label[contains(.,'Country')]]//input[@type='text']";
export const RADIOBUTTON_ONE_WAY = "//label[contains(.,'One way')]/input[@type='radio']";
export const RADIOBUTTON_ROUND_TRIP = "//label[contains(.,'Round trip')]/input[@type='radio']";
export const RADIOBUTTON_PICKUP_POINT = "//label[contains(.,'Pickup point')]/input[@type='radio']";
export const RADIOBUTTON_DELIVERY_POINT = "//label[contains(.,'Delivery point')]/input[@type='radio']";

//cargo info

//carriers
export const CHECKBOX_DEMO_CARRIER = "//div[contains(.,'Demo carrier')]/input[@type='checkbox']";

//review
export const BUTTON_SEND_REQUEST = "//button[contains(., 'Send request')]";

//request
export const BUTTON_DROPDOWN_MENU = "//button[@id='dropdownMenu']/i";
export const DROPDOWN_ITEM_DELETE = "//li[contains(@class,'dropdown-item-text') and contains(.,'Delete')]";