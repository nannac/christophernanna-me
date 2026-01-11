---
title: Request a New Certificate from a Step-CA Certificate Authority
date: 2026-01-05T03:00:21-08:00
draft: "false"
---

Prior to requesting a new certificate, the requesting client needs to have [step-cli](https://smallstep.com/docs/step-cli/) installed and the root certificate imported.

1. On the CA server, run the following command to obtain the fingerprint.

```bash
step certificate fingerprint /etc/step-ca/certs/root_ca.crt
```

2. On the client, import the root certificate

```bash
step ca bootstrap --ca-url https://<FQDN> --fingerprint <FINGERPRINT>
```

3. Run the certificate request

```bash
step ca certificate --ca-url https://<CA_FQDN> <REQUEST_FQDN>.crt <REQUEST_FQDN>.key --san <REQUEST_SAN_HOST> --san <REQUEST_SAN_DOMAIN>
```