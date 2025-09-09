#!/bin/bash

if [ "$(acpi -a)" == "Adapter 0: on-line" ]; then
  hyprctl keyword monitor "eDP-1, enable"
  hyprctl reload

  ORIGINAL_DIRECTORY=$(pwd)

  echo "$ORIGINAL_DIRECTORY"

  cd ~/.config/waybar/ || exit

  node generate-config.js

  cd "$ORIGINAL_DIRECTORY" || exit
fi
