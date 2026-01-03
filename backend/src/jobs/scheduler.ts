import { performApiCheck } from "../core/api-check-engine";

const mock = [
  { id: 1, url: "https://api.openweathermap.org", name: "Open Weather Api" },
  { id: 2, url: "https://api.github.com", name: "GitHub Api" },
  { id: 3, url: "https://google.com", name: "Google" },
  { id: 4, url: "https://non-existing-api.com", name: "Non-existing Api" },
];

export async function runMonitorPollingCycle() {
  console.log(`\n~ Initilizing monitor cycle :: ${new Date().toISOString()}\n`);

  const tasks = mock.map(async (monitor) => {
    const result = await performApiCheck(monitor.url);

    console.log(
      `[${monitor.name}] Status: ${result.status} | ${result.responseTime}ms | Up: ${result.isUp}`
    );

    if (!result.isUp) {
      console.warn(
        `\n⚠️ ALERT: ${monitor.name} is offline or not responding! Reason: ${
          result.errorMessage || "Status Code " + result.status
        }\n`
      );
    }
  });

  await Promise.allSettled(tasks);
  console.log("\n~ Cycle completed!\n");
}

setInterval(runMonitorPollingCycle, 5000);

runMonitorPollingCycle();
