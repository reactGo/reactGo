## Salt Stack

I recommend you read this [walkthrough](http://docs.saltstack.com/en/latest/topics/tutorials/walkthrough.html) and [this guide to setting up salt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-salt-on-ubuntu-12-04). I am really excited about using SaltStack, and I hope this guide can help many of you out there.

This tutorial will help you with installing salt on your Ubuntu Droplet, configuring a salt-minion to run a NodeJS express server and to ensure that the server is running.

#### Tell me what is salt now!
The backbone of Salt is the *remote execution engine*, which creates a high-speed, secure and bi-directional communication net for groups of systems. On top of this communication system lies a configuration management system called *Salt States*.

#### Basic terminology
Salt functions on a master/minion topology. A `master` server acts as a central control bus for the clients, which are called `minions`. The minions connect back to the master.

## Instructions

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

 xi. Now you can check if your minion responds: `salt '*' test.ping`.
 The `*` is the target, which specifies all minions. `test.ping` tells the minion to run the `test.ping` function. In the case of `test.ping`, `test` refers to a execution module. `ping` refers to the ping function contained in the  test module. Execution modules are the workhorses of Salt. They do the work on the system to perform various tasks, such as manipulating files and restarting services.

Note: If you find yourself having to type `sudo` for every single command because you are not `root` but are a user with `root` privelleges:

1.  Edit your ``/etc/salt/master` to change `user: root` to `user: <your user>`

2. `sudo chown -R map /etc/salt /var/cache/salt /var/log/salt /var/run/salt`

3. Try running `salt '*' test.ping` without `sudo` now
Read [more](http://docs.saltstack.com/en/latest/ref/configuration/nonroot.html).

## Running your commands
You can see what functions are available for execution by running the `salt '*' sys.doc` command

## Preparing your droplet's salt state
`Salt States`, or the `State System` is the component of Salt made for configuration management.
The state system is built on SLS(*S*a*L*t *S*tate) formulae. These formulae are built out in files on Salt's file server.

States are stored in text files on the master and transferred to the minions on demand via the master's File Server. The collection of state files make up the `State Tree`.

1. To start using a central state system in Salt, the Salt File Server must first be set up. Edit the master config file (`/etc/salt/master`) and uncomment the following lines:

```
file_roots:
  base:
    - /srv/salt
```

2. Restart the Salt master in order to pick up this change: `service salt-master restart`

3. Prepare the top file:
On the master (which is the same droplet in our case), create a new file called `top.sls` in `/srv/salt`:

```
base:
  '*':
    - webserver
```

The top file is separated into environments. The default environment is `base`. Under the `base` environment a collection of minion matches is defined; for now simply specify all hosts (`*`).

Now in the same directory (`srv/salt` in our case), create a file named `webserver.sls`, containing the following:

```
npm:              # ID declaration
  pkg:            # state declaration
    - installed   # function declaration
```

The first line, called the `ID declaration`, is an arbitrary identifier. In this case, it defines the name of the package to be installed.

The second line, called the `State declaration`, defines which of the Salt States we are using. In this case, we are using the `pkg state` to ensure that a given package is installed.

The third line, called the `Function declaration`, defines which function in the `pkg state` module to call.

## Further explanation on salt states

TODO > Fill more info in

Please refer to my example repo [here](https://github.com/choonkending/salt-states) for the salt states.

```
salt '*' state.highstate
```

## Read more
1. [pkg.installed](http://docs.saltstack.com/en/latest/ref/states/all/salt.states.pkg.html)
2. [pkgrepo.managed](http://docs.saltstack.com/en/latest/ref/states/all/salt.states.pkgrepo.html)
3. [file](http://docs.saltstack.com/en/latest/ref/states/all/salt.states.file.html)
4. [Installing nodejs v012 on Ubuntu](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)
5. [Salt formula](https://github.com/saltstack-formulas/node-formula)
