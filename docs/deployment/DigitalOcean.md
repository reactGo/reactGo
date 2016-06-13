## Getting Started with Digital Ocean

[Start Here](/SaltStackOnDigitalOcean.md)

#### Digital Ocean

1. Create a Droplet
2. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) or
[this](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server) tutorial
to set up nodejs
3. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04) tutorial to install mongodb
4. git clone this repo
```bash
npm install
sudo npm install pm2 -g
pm2 start server/index.js
pm2 startup ubuntu
sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u sammy

```

1. Create a Droplet on your Digital Ocean dashboard. Eg:
  - Droplet hostname: Example
  - Size: 5/mo
  - Droplet region: <Somewhere>
  - Select image: Ubuntu 14.04 x64
  - Add your SSH key. Read more [here](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets)
  - Remember to add Private Networking, it will be used later if you follow [this node.js guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) later on

2. If you wish to secure your droplet even further, read on:

  a. ssh into your server as root

  b. Create a new user:

  It's actually not a good idea to ssh in as `root` on a regular basis, because of how much power `root` has. It makes it easy to make destructive change, even by accident!
  ```
  # adduser demo
  ```

  c. Give root privelleges to the new user account.
  `gpasswd -a demo sudo`

  So if you need to run a command with root privelleges, type `sudo <command>`
  d. Add public key authentication

    * Manually install the public key. Copy your public key

    * Switch from `root` to your new user. `su - demo`

    * Make a directory and restrict its permissions:

      ```
        mkdir .ssh
        chmod 700 .ssh
      ```

    * `vim .ssh/authorized_keys`

    * `chmod 600 .ssh/authorized_keys`

    * `exit` to return to `root` user

    * Configure the ssh daemon:
    `vim /etc/ssh/sshd_config`
    Edit `PermitRootLogin yes` to become `PermitRootLogin no`

    * Reload your ssh `service ssh restart`

  READ more in Reference 2 and 3

#### FAQ
1. `ssh root@<ip-address>` still prompts me for my password, even when I have entered my ssh prior to this!

You can try editing your ~/.ssh/config file to have this additional entry:
```bash
Host digitalocean
  HostName <Digital Ocean IP Address>
  User <user>
  IdentityFile ~/.ssh/<rsa_key_name>
```
The next time you can just `ssh digitalocean` and you're in!

## Reference
1. [How to connect to your droplet with SSH](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)
2. [How to use ssh keys with droplets](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets)
3. [Initial Server setup with Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)
