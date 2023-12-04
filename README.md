Hey there! So, I've been tinkering with my home lab, basically building my own server network from the ground up. The main guy in charge is a physical server running ESXi, and to keep things organized and safe, I've set up pfSense as the firewall within the ESXi environment. Inside pfSense, I've got OpenVPN servers for remote access, and there's also DHCP and DNS servers for good measure. Oh, and I've thrown in Suricata to keep an eye out for any intruders.

To make things even more tidy and secure, I've played around with VLANs to create different networks that don't mess with each other.

Now, onto the ESXi server itself. I've got TrueNAS Scale running on it, connected to ESXi's file system via NFS. This serves as my storage for all the servers. There's also a Ubuntu Server hanging around, playing host to my NGINX web server for all my websites and some other organizational stuff. Another Ubuntu Server is doing its thing as a testbed for running potentially sketchy code.

Each of these servers is doing its own thing on different networks. For instance, the Web Server is cruising on the "Secure" Network, while the testing Ubuntu Server is doing its thing on the "Unsecure" Network. ESXi, pfSense, and TrueNAS are all cozy on the "Trusted" network.

I've set up my own certificate authority. I use it to whip up certificates for all these servers. It's been a real hands-on experience, diving deep into network configuration, fixing DNS hiccups, and dealing with other challenges that pop up. These real-world encounters have been gold for sharpening my skills and keeping this whole home lab setup robust.


### Credits
Main page made by [designmodo](https://github.com/designmodo/html-website-templates)
