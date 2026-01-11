---
title: Configure Step-CA to Serve Requests via CNAME
date: 2026-01-05T03:00:21-08:00
draft: "false"
---
Using a CNAME for a Certificate Authority abstracts it's access point from its underlying server allowing you to use a memorable URL or migrate the CA to another server later.

The below configuration will allow access from either IP, hostname, or CNAME. You adjust accordingly.

1. Modify `$(step path)/config/ca.json` with your host information.

```json
"dnsNames": [
                "<LOOPBACK IP>",
                "<IP>",
                "<FQDN>",
                "<CNAME>"
        ],
```

2. Modify` $(step path)/config/defaults.json` with your host information.

```json
"ca-url": ["https://<IP>", "https://<FQDN>", "https://<CNAME>"],
```

3. Restart the step-ca service

```bash
sudo systemctl restart step-ca
```

4. Verify configuration

```bash
step ca health --ca-url https://<IP|FQDN|CNAME> --root <path_to_root_cert>
```

 An **ok** response means your step-ca instance is now accessible via the supplied URI.