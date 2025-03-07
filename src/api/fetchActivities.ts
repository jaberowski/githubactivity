import { UserName } from "../models/username";
import Event from "../models/event";

export async function fetchActivities(username: UserName) {
  return fetch(`https://api.github.com/users/${username}/events`).then(
    (res) => {
      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found ");
        else throw new Error("error fetching data " + res.status);
      } else {
        return res.json() as Promise<Event[]>;
      }
    }
  );
}
