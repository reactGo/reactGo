# Salt Stack

I recommend you read this [walkthrough](http://docs.saltstack.com/en/latest/topics/tutorials/walkthrough.html) and [this guide to setting up salt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-salt-on-ubuntu-12-04). I am really excited about using SaltStack, and I hope this guide can help many of you out there.

## Tell me what is salt now!
The backbone of Salt is the *remote execution engine*, which creates a high-speed, secure and bi-directional communication net for groups of systems. On top of this communication system lies a configuration management system called *Salt States*.

## Basic terminology
Salt functions on a master/minion topology. A `master` server acts as a central control bus for the clients, which are called `minions`. The minions connect back to the master.

# Instructions

1. Firstly, `ssh` into your droplet. If you have trouble with this, read [GettingStartedWithDigitalOcean](https://github.com/choonkending/react-webpack-node/blob/master/docs/GettingStartedWithDigitalOcean.md)

2. Install the SaltStack PPA (personal packaged archives) for Ubuntu - I'm using 14.04.
  i. `sudo apt-get install python-software-properties`

  ii. `sudo add-apt-repository ppa:saltstack/salt`

  iii. Update the apt package database:
  `sudo apt-get update`

  iv. Install the salt-master:
  `sudo apt-get install salt-master`

  v. Install the salt-minion:
  `sudo apt-get install salt-minion`

  vi. Since the salt master and minion are running on the same host, edit `/etc/salt/minion` to uncomment and change from `master: salt` to `master: localhost`

  vii. Restart salt-minion service: `service salt-minion restart`

  viii. List all the Minion keys your salt Master knows: `salt-key -L`
    The Minion's key should now show up under Unaccepted Keys.

    Accepted Keys:
    Unaccepted Keys:
    <Your droplet's name>
    Rejected Keys:

  ix. Have the salt-master accept the minion's public key. `salt-key -a <droplet name>`

  x.
  ```
  The following keys are going to be accepted:
  Unaccepted Keys:
  <droplet name>
  Proceed? [n/Y] Y
  Key for minion Map-1 accepted.
  ```

 xi. Now you can check if your minion responds: `salt '*' test.ping`

Note: If you find yourself having to type `sudo` for every single command because you are not `root` but are a user with `root` privelleges.
1.  Edit your ``/etc/salt/master` to change `user: root` to `user: <your user>`.
2. `sudo chown -R map /etc/salt /var/cache/salt /var/log/salt /var/run/salt`
3. Try running `salt '*' test.ping` without `sudo` now
Read [more](http://docs.saltstack.com/en/latest/ref/configuration/nonroot.html).
