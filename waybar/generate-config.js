import { exec } from "child_process";
import fs from "node:fs"
import mainMonitorConfigModule from "./modules/main-monitor.json" with { type: "json" }
import secondaryMonitorConfigModule from "./modules/secondary-monitor.json" with { type: "json" }
import hyprlandWorkspacesConfigModule from "./modules/hyprland-workpaces.json" with { type: "json" }

const mainMonitors = [
  "BNQ BenQ PD3200U M9H01553019", // Office monitor
  "LG Electronics LG TV SSCR2 0x01010101", // Home monitor
  "Samsung Display Corp. 0x419F" // Mobile monitor
]

const secondaryMonitors = [
  "Lenovo Group Limited LEN P27h-10 0x01010101", // Office monitor
  "Lenovo Group Limited LEN Y27gq-20 #ASORjCQSAC3d" // Home monitor
]

const getMainMonitorNames = (monitors) =>
  monitors
    .map(({ description, name }) =>
      mainMonitors.includes(description) ? name : null)
    .filter(Boolean)


const getSecondaryMonitorNames = (monitors) =>
  monitors
    .map(({ description, name }) =>
      secondaryMonitors.includes(description) ? name : null)
    .filter(Boolean)

const generateConfiguration = () => {
  exec("hyprctl -j monitors", (_, monitorsJSON, __) => {
    const monitors = JSON.parse(monitorsJSON)

    const mainMonitorNames = getMainMonitorNames(monitors)
    const secondaryMonitorNames = getSecondaryMonitorNames(monitors)

    writeConfiguration(
      JSON.stringify(
        [
          {
            ...mainMonitorConfigModule,
            ...hyprlandWorkspacesConfigModule,
            output: mainMonitorNames
          },
          {
            ...secondaryMonitorConfigModule,
            ...hyprlandWorkspacesConfigModule,
            output: secondaryMonitorNames
          }
        ]
      )
    )
  })
}

const writeConfiguration = (newConfig) => {
  fs.writeFile(
    "./config.jsonc",
    newConfig,
    (error) =>
      error ?
        console.log(error) :
        console.log('waybar config written!')
  )
}

generateConfiguration()
