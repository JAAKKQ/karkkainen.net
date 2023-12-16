## Home Lab

Welcome to my meticulously crafted home lab, where I take the reins of my digital domain. At the core of this operation is a robust physical server running ESXi, dictating the orchestration of my personalized server network. To fortify the digital fortress, I've deployed pfSense as the guardian firewall within the ESXi environment, overseeing the ingress and egress of data.

Inside the secure walls of pfSense, I've implemented OpenVPN servers for seamless remote access, complemented by DHCP and DNS servers for an efficient and reliable network infrastructure. As an additional layer of defense, the vigilant Suricata stands guard, ever watchful for any signs of unwanted intruders.

In the pursuit of organization and security, I've ventured into the realm of VLANs, weaving a tapestry of distinct networks that operate harmoniously without interference.

The ESXi server itself hosts the formidable TrueNAS Scale, seamlessly connected to ESXi's file system via NFS. This powerhouse serves as the central repository for all my servers, ensuring a unified storage solution. An Ubuntu Server takes center stage, hosting my NGINX web server responsible for delivering my array of websites and overseeing various organizational tasks. Yet another Ubuntu Server assumes the role of a testbed, fearlessly running potentially dubious code for experimentation.

Each server resides on its designated network, with the Web Server confidently cruising on the "Secure" Network, while the daring testing Ubuntu Server fearlessly roams the "Unsecure" Network. ESXi, pfSense, and TrueNAS find camaraderie on the "Trusted" network, forming the backbone of this digital domain.

In my pursuit of digital autonomy, I've established a custom certificate authority, diligently crafting certificates for each server. This hands-on journey has immersed me in the intricacies of network configuration, troubleshooting DNS hiccups, and tackling unforeseen challenges head-on. These real-world encounters serve as invaluable crucibles, continuously refining my skills and fortifying the resilience of my home lab setup. Welcome to a realm where innovation meets security, and every challenge is an opportunity for growth.

In the past, I've extended this domain to host my own email with Mailcow and a personal cloud using Nextcloud. However, the need for constant vigilance led me to migrate to email and cloud service providers. This experience has taught me a lesson on the significance of leveraging cloud service providers - discerning when to harness their capabilities and when it's prudent to explore alternative solutions.

#### Things you can find from this website:
1. [records/](https://karkkainen.net/records/) -- Here you will find my vinyl collection search manager.
2. [servers/](https://karkkainen.net/servers/) -- Tool for me to quickly connect to my servers.
3. [projects/](https://karkkainen.net/projects) -- Page where I can make detailed documentations or tell more about my projects.
4. [ipfs/](https://karkkainen.net/ipfs) -- Version of the website that was send to the IPFS servers.
5. [jankon.betoni/](https://karkkainen.net/jankon.betoni) -- Website I sometimes put to others computers when they are not around.
6. [cv/](https://karkkainen.net/cv/) --  About me
7. [down/](https://karkkainen.net/down/) -- You can find the page when me servers are down.
8. [breaches/](https://karkkainen.net/breaches/) -- Here you can browse website breaches reported by haveibeenpwned.com