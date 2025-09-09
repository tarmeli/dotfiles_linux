import { exec } from "child_process"

const officeMonitor = "BNQ BenQ PD3200U M9H01553019"
const homeMonitor = "LG Electronics LG TV SSCR2 0x01010101"

const getMonitor = () => {
  exec("hyprctl -j monitors", (_, monitorsJSON, __) => {
    const monitors = JSON.parse(monitorsJSON)
    const monitorDescriptions = geDescriptions(monitors)

    if (monitorDescriptions.includes(officeMonitor)) {
      return exec('hyprlock -c ~/.config/hypr/modules/hyprlock/office.conf',
        (
          error,
          output,
          somethingElse
        ) => { console.log('called hyprlock?', output, error, somethingElse) }
      )
    }

    if (monitorDescriptions.includes(homeMonitor)) {
      return exec('hyprlock -c ~/.config/hypr/modules/hyprlock/home.conf',
        (
          error,
          output,
          somethingElse
        ) => { console.log('called hyprlock?', output, error, somethingElse) }
      )
    }

    return exec('hyprlock -c ~/.config/hypr/modules/hyprlock/default.conf',
      (
        error,
        output,
        somethingElse
      ) => { console.log('called hyprlock?', output, error, somethingElse) }
    )
  })
}

const geDescriptions = (monitors) => {
  return monitors.map(({ description }) => description)
}

getMonitor()
