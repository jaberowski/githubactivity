export type UserName = string & { __tag: "username" };

export function parseUsername(input: any): input is UserName {
  if (typeof input !== "string") return false;
  if (input.length < 1) return false;
  else return true;
}
