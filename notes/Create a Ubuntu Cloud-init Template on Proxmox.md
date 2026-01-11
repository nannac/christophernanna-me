---
title: Create a Ubuntu Cloud-init Template on Proxmox
date: 2026-01-05T03:00:21-08:00
draft: "false"
---

This guide walks through creating an **Ubuntu cloud-init virtual machine template** on **Proxmox VE** using Ubuntu’s official cloud images. The process builds a minimal, preconfigured base VM with the **QEMU Guest Agent** installed and **cloud-init enabled**, then converts it into a reusable template.

Using a cloud-init template allows you to **rapidly provision consistent Ubuntu VMs** without manual installation. Each cloned VM can be customized at deploy time (hostname, users, SSH keys, networking) while sharing the same clean base image.

## 1. Install image customization tools

Installs tools needed to modify offline images. 

`apt-get install libguestfs-tools`

---
## 2. Download the Ubuntu cloud image

Download the official Ubuntu 24.04 (Noble) cloud image with cloud-init preconfigured.  

`wget https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img`

> Latest images available at https://cloud-images.ubuntu.com/

---
## 3. Inject QEMU guest agent into the image

Add the  QEMU Guest Agent so Proxmox can manage power state, IP reporting, and backups.  

`virt-customize -a noble-server-cloudimg-amd64.img --install qemu-guest-agent`

---
## 4. Create the VM shell in Proxmox

Create an empty VM definition that will become the template.

`qm create 9000 --name "ubuntu-noble-cloudinit-template" --memory 2048 --net0 virtio,bridge=vmbr0`

---
## 5. Rename the cloud image

Proxmox expects  the .qcow2 file extension.

`mv noble-server-cloudimg-amd64.img noble-server-cloudimg-amd64.qcow2`

---
## 6. Import the disk into Proxmox storage

Import the cloud image into Proxmox storage for use by the VM.  

`qm importdisk 9000 noble-server-cloudimg-amd64.qcow2 local-lvm`

---
## 7. Attach disk and enable cloud-init

Attaches the OS disk and adds the cloud-init drive.  

`qm set 9000 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-9000-disk-0 qm set 9000 --boot order=scsi0 qm set 9000 --ide2 local-lvm:cloudinit`

---
## 8. Enable QEMU agent and serial console (recommended)

Enable guest communication and console access. 

`qm set 9000 --agent enabled=1 qm set 9000 --serial0 socket --vga serial0`

---

## 9. Convert the VM into a template

Finalizes the VM as a reusable cloud-init template.  

`qm template 9000`

---

You now have a **clean Ubuntu cloud-init template** ready for cloning and customization via Proxmox, Terraform, or other automation tools.