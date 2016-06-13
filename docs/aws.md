## Deploying To AWS

Amazon AWS allows you access to a free tier of service for a year, so it is a great option if you are looking for a place to host your project and want to grow your Ops skills along with your dev skills.

##### SIGN UP

The first thing you will need to do is sign up for an [account](https://aws.amazon.com/free/)

Amazon has a lot of options, but we will be focused on the more simple way for deploying, using EC2, so navigate to the EC2 dashboard.

##### SECURITY GROUP

Before you initialize a new instance you will need to set up a security group. This security group will just open the ports you need for development. Once you go to production you should SERIOUSLY consider a more locked down security group.

This is what a basic security group should look like. The 2 custom ports are for the port we are running on in development and the default mongoDB port. If you are running on different ports replace these as needed.

```
  TYPE          PROTOCOL    PORT RANGE    SOURCE
  HTTP            TCP           80       0.0.0.0/0
  SSH             TCP           22       0.0.0.0/0
  HTTPS           TCP           443      0.0.0.0/0
Custom TCP Rule   TCP           3000     0.0.0.0/0
Custom TCP Rule   TCP           27017    0.0.0.0/0
```

##### SETTING UP THE INSTANCE

Now it is time to create an instance. So make sure you are in the correct region. This should be the region that is closet to your geographic location. The drop down list in the top right hand corner.

Once that is ready click on the instance option in the side bar and then click launch instance.

Pick the Ubuntu Server 14.04 that is free tier eligible, follow through the steps, but the defaults should all suffice. Tag your project with a name and then apply the security group you created earlier, review and launch.

The last step will be to create or use an existing key pair. do this and save it someplace safe.

After a couple of minutes your instance will be ready, and visible under the running instances. You will be able to navigate to the site using the public IP. That public IP is unstable so next you will want to set up an elastic IP and pair that with your instance.

##### ELASTIC IP

Allocating the Elastic IP is as simple and clicking the button. But then you need to pair it with your instance, which is also very simple. But is also very important because even though you are using the free tier Amazon will charge you for unpaired Elastic IPs.

Once that is set up it is time to connect,  We will be using SSH, which is why we opened up port 22 in our security group.

##### CONNECTING

There are explicit instruction if you click the connect button on the instances page of the EC2 dashboard. But in your terminal you will need to type something that looks like this.

`ssh -i "node.pem" ubuntu@ec2-##-#-###-###.compute-1.amazonaws.com`

Now that you are connected you are on the server. And the server is clean so we need to install some things.

##### INSTALLING SOFTWARE

First install [node](https://nodejs.org/en/download/package-manager/)
then [mongoDB](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/)
Both of these have multiple versions so make sure you follow the instructions for Ubuntu 14.04.

If you want to start mongo temporarily you would use this command
`sudo /usr/bin/mongod --dbpath /home/ubuntu/db/data`
to keep if running forever you will need this command
`sudo /usr/bin/mongod --dbpath /home/ubuntu/db/data --fork --logpath /var/log/mongodb.log`

##### UPLOADING YOUR FILE

Now we will start uploading our files using [secure copy](https://en.wikipedia.org/wiki/Secure_copy)

`scp -i KEYFILE.pem -r SOURCE ubuntu@ec2-##-##-##-###.compute-1.amazonaws.com:DEST`

The KEYFILE is the same one you created and saved someplace safe earlier. The SOURCE is File containing everything you want to upload and DEST is the folder on the server you want to copy it into.

I highly suggest that you do no use this method to copy over your dependencies, it is a much better plan to install those once you have uploaded your files.

##### RUNNING THE PROJECT

Now that your files and dependencies are on the server a simple `npm start` will get you going. But it wont keep you going. Once you close your SSH connection your site will go down.

##### KEEPING IT RUNNING

To remedy this will will use [forever](https://www.npmjs.com/package/forever). We will need to install it globally `sudo npm install forever -g` and then add another script to our package.js. Just a modified version of the start stript. `"stayAlive": "cross-env NODE_ENV=production forever start compiled/index.js",`

##### REMOVING THE PORT

The simplest way to remove the port would be user IP Tables. Running `sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000` This solution is fine if you are just building a small side project and want a clean url, but don't care that much about security.

A more production ready solution would be to use [NginX](https://www.nginx.com/resources/wiki/) and use the reverse proxy to allow the project to run on its own port, while the users access the using port 80. A simple tutorial can be found [here](https://eladnava.com/binding-nodejs-port-80-using-nginx/). NginX has the added benefits of being able to blocking ip's, detect some web attacks and  protecting your application.
