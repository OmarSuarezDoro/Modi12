/**
 * This type is used to define the structure of the request message that the client sends to the server.
 */
export type requestMessage = {
  user: string,
  action: string,
  path: string,
  dataObj: any,
}