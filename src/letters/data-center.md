---
title: A bit about my data center
description: How I have built and evolved a data center over six years, continuously improving its networking, power, services and reliability to create a foundation for current and future projects.
author: Rene Kärkkäinen
---

# A bit about my data center

Written by Rene Kärkkäinen on 11.09.2026

I have been building and developing my own data center for approximately six years. During this time, I have improved the infrastructure every year and changed the architecture based on what I have learned. The current version of the project is called Data Center 8.5.

I have not written much about it publicly, but since it has played such a crucial role in my learning, I decided to write a bit about it here.

The project started much smaller than it is today. Over the years, I have built different versions of the infrastructure, tested different technologies and changed the architecture when I found better solutions.

The purpose of the data center is to provide a foundation for current and future projects. The infrastructure provides the necessary network, computing, storage, power and services that can be used by different projects as they are developed.

The idea is to build the infrastructure once and continue improving it over time, rather than creating separate infrastructure for every project. This provides a common platform that can be expanded as new requirements arise.

The infrastructure has changed quite a lot during these six years. In the beginning, I was mainly interested in getting services running. Later, I started paying more attention to networking, security, reliability and how the different parts of the infrastructure work together.

One of the first major improvements was moving from a single server to a virtualized environment. This allowed me to run multiple services on the same hardware and made it easier to experiment with different systems.

I have also experimented with different virtualization platforms over the years. I currently use Proxmox for virtualization. This has given me a good environment for running different virtual machines and testing new services without needing separate physical hardware for every project.

Networking has also become an increasingly important part of the project. I have used VLANs to separate different types of traffic and VPNs to provide secure remote access to the infrastructure.

During the development of the data center, network reliability has become one of the most important areas of the project. The current architecture uses secure network tunnels for connectivity and has been designed with the possibility of network outages in mind.

To reduce dependency on any single external provider, I am planning to operate my own Autonomous System with two upstream providers. I would announce my own IP address space through both providers using BGP. This would fundamentally change the current operational model in a positive way and provide additional redundancy.

Reliable energy supply is also an important part of the data center. I have built a battery system and installed a power generator that can provide continuous energy during power outages. The purpose of this system is to keep the data center operational even when the normal electricity supply is unavailable.

The services currently provided include e-mail, file storage and a phone system. These services are provided using open-source software such as Postfix, Nextcloud and FreePBX.

I have also used the infrastructure for more experimental projects. For example, I have experimented with remote workstations, GPU passthrough, automation and different ways of providing services through virtual machines.

Not everything I have planned over the years has been implemented. Some ideas turned out to be unnecessarily complicated, while others were replaced with simpler solutions. I think this has been one of the most useful parts of the project because it has taught me that a good architecture is not necessarily the most complicated one.

During these six years, the data center has been continuously improved. Each version has provided new information about networking, power, services and reliability. Some parts of the infrastructure have been replaced while other parts have been redesigned to improve the overall operation of the system.

One of the most important lessons from this project has been that building a data center is not only about having servers. The network, power supply, software, security and reliability of the whole system must be considered together.

Another important lesson has been the value of continuous improvement. The first version did not need to be perfect. Each version provided an opportunity to identify problems, improve the architecture and apply what I had learned to the next version.

This project has also been an important part of my studies. I started the project before starting my degree studies, and it has continued alongside them. Concepts that I have learned through my studies have given me new ideas for improving the infrastructure, while working with the infrastructure has given me a practical way to understand those concepts.

The current Data Center 8.5 is therefore not the final version. It is another step in the development of the infrastructure. The objective is to continue improving the system every year and to provide a better foundation for the projects that depend on it.

The project has developed considerably during these six years, and I expect that it will continue to change as I learn more and as new projects require new capabilities.

Data Center 8.5 is the current result of that development, but the work continues.

The next version will build on what I have learned from this one.