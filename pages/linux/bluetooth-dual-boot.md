---
title: Dual boot bluetooth pairing
---

# Pairing a bluetooth device in dual boot

You have great bluetooth headphones... You have a dual boot Windows/Linux
machine. You don't want to have to keep re-pairing the device each time you
reboot. Just share the pairing secret!

:::info

`XX:XX:XX:XX:XX:XX` is the MAC address of your bluetooth device
(headphones/keyboard/mouse/etc).

`YY:YY:YY:YY:YY:YY` is the MAC address of your bluetooth dongle/adaptor.

These values will need to be replaced throughout this article. Normally you can
figure out what they are by following the steps and using auto-complete.

:::

It's relatively easy:

1. Pair device in Linux.
2. Reboot to Windows and pair device there. (This will break Linux pair.)
3. Extract BINARY registry key from
   `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\BTHPORT\Parameters\Keys\YYYYYYYYYYYY\XXXXXXXXXXXX`,
   you want it as hex (32 characters (16 bytes), all uppercase)
4. Reboot to Linux, and `sudo su`, then
   `vim /var/lib/bluetooth/YY:YY:YY:YY:YY:YY/XX:XX:XX:XX:XX:XX/info` and replace
   the value in the `Key=...` line with the hex from step 3
5. `sudo services bluetooth restart`
6. Hopefully your bluetooth device now automatically connects. Congrats!

:::tip Getting the registry key from Linux

Step 3 can instead be achieved from Linux if you can mount your Windows
partition at `/media/USER/WINDOWS_DRIVE`:

```sh
sudo apt install reglookup
reglookup -t BINARY -p /ControlSet001/Services/BTHPORT/Parameters/Keys/ /media/USER/WINDOWS_DRIVE/Windows/System32/config/SYSTEM
```

You'll get something like:

```
PATH,TYPE,VALUE,MTIME
/ControlSet001/Services/BTHPORT/Parameters/Keys/yyyyyyyyyyyy/xxxxxxxxxxxx,BINARY,SOME_CHARACTERS_HERE,
```

The value of `SOME_CHARACTERS_HERE` (containing alphanumeric characters,
percents, tildes, etc) can be decoded with the following JS function:

```
const decode = v => v.replace(/%..|./g, t => t[0] === '%' ? t.substring(1) : t.charCodeAt(0).toString(16)).toUpperCase();
decode('SOME_CHARACTERS_HERE');
```

Then use this resulting 32 character hex code in step 4.

:::

## Credits

Thanks to the following resources for providing all this detail already. I'm
mostly repeating it here for myself for the next time I have to do this!

- https://www.castoriscausa.com/posts/2021/02/28/bluetooth-dual-boot/
- https://superuser.com/a/1670739
