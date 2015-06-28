# Getting Started with Digital Ocean
1. Create a Droplet on your Digital Ocean dashboard. Eg:
  - Droplet hostname: Example
  - Size: 5/mo
  - Droplet region: Singapore
  - Select image: Ubuntu 14.04 x64
  - Add your SSH key. Read more [here](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets)
  - Remember to add Private Networking, it will be used later if you follow [this node.js guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) later on
2. If you wish to secure your droplet and only allow people ssh in, read on:

  a. Make sure you can ssh into your droplet without being prompted for a password
  b. Once in, `vim /etc/ssh/sshd_config` and edit the following:
  ```bash
  # UsePAM yes
  PermitRootLogin without-password #password authentication is disabled for root
  ```
  c. It's necessary to restart or rehup the sshd process to have it re-read the new configuration. This can be done via the following:
  ```
  # ps auxw | grep ssh
  root       953  0.0  0.6  61364  3064 ?        Ss   08:19   0:00 /usr/sbin/sshd -D

  # kill -HUP  953
  ```
  Note: I've extracted the above from an article linked in Reference 2.

# FAQ
1. `ssh root@<ip-address>` still prompts me for my password, even when I have entered my ssh prior to this!

You can try editing your ~/.ssh/config file to have this additional entry:
```bash
Host digitalocean
  HostName <Digital Ocean IP Address>
  User root
  IdentityFile ~/.ssh/<rsa_key_name>
```
The next time you can just `ssh digitalocean` and you're in!

# Reference
1. [How to connect to your droplet with SSH](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)
2. [How to use ssh keys with droplets](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets)
