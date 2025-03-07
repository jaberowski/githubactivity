import { displayActivities } from "./views/displayActivities";
import Event from "./models/event";
import { fetchActivities } from "./api/fetchActivities";
import { parseUsername, UserName } from "./models/username";

function main(argument: string) {
  if (!parseUsername(argument)) {
    console.error("invalid input");
    process.exit(1);
  }

  fetchActivities(argument)
    .then((activities) => {
      displayActivities(activities);
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}

main(process.argv.slice(2)[0]);
