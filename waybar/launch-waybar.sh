#!/bin/bash

CONFIG_FILES=("$HOME/.config/waybar/config.jsonc" "$HOME/.config/waybar/style.css" "$HOME/.config/waybar/modules/")

#trap "killall waybar" EXIT

while true; do

  cd "$HOME"/.config/waybar/ || exit

  node generate-config.js
  waybar &
  inotifywait -r -e create,modify "${CONFIG_FILES[@]}"
  killall waybar

done
