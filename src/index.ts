import { parseUsername } from "./parseUsername";

const argument = process.argv.slice(2)[0];

if (!parseUsername(argument)) {
  throw new Error("invalid input");
}

console.log(`https://api.github.com/users/${argument}/events`);

const activity = fetch(`https://api.github.com/users/${argument}/events`)
  .then((res) => {
    if (!res.ok) throw new Error("github error ");
    else return res.json() as Promise<Event[]>;
  })
  .then((data) => {
    (data as any[]).map((item) => console.log(item.payload.action));
  });
