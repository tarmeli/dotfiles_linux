if [ "$(acpi -a)" == "Adapter 0: on-line" ]; then
  hyprctl keyword monitor "eDP-1, disable"

  ORIGINAL_DIRECTORY=$(pwd)

  echo "$ORIGINAL_DIRECTORY"

  cd ~/.config/waybar/ || exit

  node generate-config.js

  cd "$ORIGINAL_DIRECTORY" || exit
else
  loginctl lock-session
  systemctl suspend
fi
