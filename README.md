This is my website's source code where I put all kind of things. On the main page I use the free slides template made by [Designmodo](https://github.com/designmodo/html-website-templates).

1. [records/](https://r3ne.net/records/) - Here you will find my vinyl collection search manager.
2. [servers/](https://r3ne.net/servers/) - Tool for me to quickly connect to my servers.
3. [projects/](https://r3ne.net/projects) - Page where I can make detailed documentations.
4. [ipfs/](https://r3ne.net/ipfs) - Version of the website that was send to the IPFS servers.
5. [jankon.betoni/](https://r3ne.net/jankon.betoni) - Website I sometimes put to others computers when they are not around.
6. [cv/](https://r3ne.net/cv/) -  My short CV.
7. [down/](https://r3ne.net/down/) - You can find the page when me servers are down.

I run all my websites on my home lab so, basically I have been building my own server network from the ground up. The main guy in charge is a physical server running ESXi, and to keep things organized and safe, I've set up pfSense as the firewall within the ESXi environment. Inside pfSense, I've got OpenVPN servers for remote access, and there's also DHCP and DNS servers for good measure. Oh, and I've thrown in Suricata to keep an eye out for any intruders.

To make things even more tidy and secure, I've played around with VLANs to create different networks that don't mess with each other.

Now, onto the ESXi server itself. I've got TrueNAS Scale running on it, connected to ESXi's file system via NFS. This serves as my storage for all the servers. There's also a Ubuntu Server hanging around, playing host to my NGINX web server for all my websites and some other organizational stuff. Another Ubuntu Server is doing its thing as a testbed for running potentially sketchy code.

Each of these servers is doing its own thing on different networks. For instance, the Web Server is cruising on the "Secure" Network, while the testing Ubuntu Server is doing its thing on the "Unsecure" Network. ESXi, pfSense, and TrueNAS are all cozy on the "Trusted" network.

I've set up my own certificate authority. I use it to whip up certificates for all these servers. It's been a real hands-on experience, diving deep into network configuration, fixing DNS hiccups, and dealing with other challenges that pop up. These real-world encounters have been gold for sharpening my skills and keeping this whole home lab setup robust.