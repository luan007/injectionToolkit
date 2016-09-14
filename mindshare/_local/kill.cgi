#!/bin/sh
echo "Content-type: text/plain"
echo
env

dev=$(cat /proc/net/arp | grep -w "$REMOTE_HOST" | awk '{print $4}')
ubus call hostapd.wlan0 del_client '{"addr":"$dev", "reason":1, "deauth":true, "ban_time":0}'
