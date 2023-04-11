const devBaseUrl = ""
const productionBaseUrl = ""
export const defaultEndPointDetails = productionBaseUrl;
export var smartContractAddress = "";
export var ferrumNetworkIdentifier = "";
export var allowedNetwork;
export function setSmartContractAddress(address) {
  smartContractAddress = address;
}
export function setFerrumNetworkIdentifier(identifier) {
  ferrumNetworkIdentifier = identifier;
}
export function setAllowedNetwork(item) {
  allowedNetwork = item;
}