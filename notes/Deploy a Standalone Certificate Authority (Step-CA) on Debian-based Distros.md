---
title: Deploy a Standalone Certificate Authority (Step-CA) on Debian-based Distros
date: 2026-01-05T03:00:21-08:00
draft: "false"
---

## 1. Install Prerequisites and step-ca Packages

Install required system tools, add the Smallstep APT repo, and install `step-ca` and `step-cli`.

`apt-get update && apt-get install -y --no-install-recommends curl gpg ca-certificates curl -fsSL https://packages.smallstep.com/keys/apt/repo-signing-key.gpg -o /etc/apt/trusted.gpg.d/smallstep.asc && \     echo 'deb [signed-by=/etc/apt/trusted.gpg.d/smallstep.asc] https://packages.smallstep.com/stable/debian debs main' \     | tee /etc/apt/sources.list.d/smallstep.list apt-get update && apt-get -y install step-cli step-ca`
## 2. Initialize the Certificate Authority

Run the interactive initialization to generate CA keys, certificates, and config.

`step ca init`

Review the available options in the official guide:  
[https://smallstep.com/docs/step-ca/getting-started/](https://smallstep.com/docs/step-ca/getting-started/)




step ca provisioner add acme --type ACME

## 3. Verify step-ca Can Bind to Privileged Ports

Grant permission to bind to ports below 1024 and test startup.

`sudo setcap CAP_NET_BIND_SERVICE=+eip $(which step-ca) step-ca`
## 4. Create a Dedicated System User

Create a locked-down system user to run the CA service.

`sudo useradd --system --home /etc/step-ca --shell /bin/false step`
## 5. Set Capabilities for step-ca Binary

Reapply the capability to ensure it persists for the service.

sudo setcap CAP_NET_BIND_SERVICE=+eip $(which step-ca)
## 6. Move CA Data to a System Location

Create the target directory and move the generated CA files.

```
sudo mkdir /etc/step-ca && sudo mv $(step path)/* /etc/step-ca
```
## 7. Fix Ownership and Permissions

Ensure the CA user owns all files.

```
sudo chown -R step:step /etc/step-ca
```
## 8. Store the CA Key Password

Save the password used during `step init` for unattended startup.

`PASSWORD="<YOUR GENERATED KEY>" sudo sh -c 'echo "$PASSWORD" > /etc/step-ca/password.txt'`
## 9. Update Config Paths

Update configuration files to reference `/etc/step-ca`.

```
sed -Ei 's|"/[^"]*\.step/[^"]*"|"/etc/step-ca/"|g' /etc/step-ca/config/{defaults.json,ca.json}
```
## 10. Create the systemd Service

Create the service unit file.

```
sudo nano /etc/systemd/system/step-ca.service
```

Paste the following contents:

```
[Unit]
Description=step-ca service
Documentation=https://smallstep.com/docs/step-ca
Documentation=https://smallstep.com/docs/step-ca/certificate-authority-server-production
After=network-online.target
Wants=network-online.target
StartLimitIntervalSec=30
StartLimitBurst=3
ConditionFileNotEmpty=/etc/step-ca/config/ca.json
ConditionFileNotEmpty=/etc/step-ca/password.txt

[Service]
Type=simple
User=step
Group=step
Environment=STEPPATH=/etc/step-ca
WorkingDirectory=/etc/step-ca
ExecStart=/usr/bin/step-ca config/ca.json --password-file password.txt
ExecReload=/bin/kill --signal HUP $MAINPID
Restart=on-failure
RestartSec=5
TimeoutStopSec=30
StartLimitInterval=30
StartLimitBurst=3

AmbientCapabilities=CAP_NET_BIND_SERVICE
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
SecureBits=keep-caps
NoNewPrivileges=yes

ProtectSystem=full
ProtectHome=true
RestrictNamespaces=true
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6
PrivateTmp=true
PrivateDevices=true
ProtectClock=true
ProtectControlGroups=true
ProtectKernelTunables=true
ProtectKernelLogs=true
ProtectKernelModules=true
LockPersonality=true
RestrictSUIDSGID=true
RemoveIPC=true
RestrictRealtime=true
SystemCallFilter=@system-service
SystemCallArchitectures=native
MemoryDenyWriteExecute=true
ReadWriteDirectories=/etc/step-ca/db

[Install]
WantedBy=multi-user.target
```

```
PASSWORD=Y1JSdt7loHU1yUdPSf7tO0BcIVzysUtE
sudo echo $PASSWORD > /etc/step-ca/password.txt
```
## 11. Enable and Start the CA Service

Reload systemd, start the service, and verify status.

```
sudo systemctl daemon-reload
sudo systemctl enable step-ca --now 
sudo systemctl status step-ca
```