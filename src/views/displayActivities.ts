import Event, { EventType } from "../models/event";

export function displayActivities(eventList: Event[]) {
  if (eventList.length === 0) {
    console.log("no recent activity");
    return;
  }
  eventList.forEach((event) => console.log(displayActivity(event)));
}

export function displayActivity(event: Event): string {
  const {
    payload,
    repo: { name: repo },
    type,
  } = event;
  switch (type) {
    case EventType.CreateEvent:
      switch (payload!.ref_type) {
        case "branch":
          return `Created a branch for ${repo}`;

        case "tag":
          return `Created a tag for ${repo}`;

        default:
          return `Created ${repo}`;
      }

    case EventType.DeleteEvent:
      const isbranch = payload!.ref_type === "branch";
      return `Deleted ${isbranch ? "a branch" : "a tag"} from ${repo}`;
    case EventType.ForkEvent:
      return `Forked from ${repo}`;

    case EventType.IssuesEvent:
      return `${
        payload!.action.charAt(0).toUpperCase() + payload!.action.slice(1)
      } an issue in ${repo}`;

    case EventType.PushEvent:
      return `Pushed ${
        payload!.size > 1 ? payload!.size + " commits" : "a commit"
      } to ${repo}`;

    case EventType.WatchEvent:
      return `started ${repo}`;
  }
}
