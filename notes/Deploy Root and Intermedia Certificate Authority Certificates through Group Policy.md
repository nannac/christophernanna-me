---
title: Deploy Root and Intermedia Certificate Authority Certificates through Group Policy
date: 2026-01-05T03:00:21-08:00
draft: "false"
---

> These instructions assume you already have both the root and intermediate certificates from your CA.
### Create a GPO to Deploy the Certificates

1. Open the Group Policy Object Editor
2. Right-click on **Group Policy Objects** for the desired domain and click ***New***. Name the GPO something descriptive like "Deploy Root and Intermediate Certificates".
### Add the Root Certificate

1. Right-Click on **Computer Configuration > Policies > Windows Settings > Security Settings > Public Key Policies > Trusted Root Certification Authorities** and select ***"Import"***
2. Browse to your **intermediate certificate** and click **"Next"**.
### Add the Intermediate Certificate

1. Right-click on **Computer Configuration > Policies > Windows Settings > Security Settings > Public Key Policies > Trusted Root Certification Authorities** and select ***"Import"***
2. Browse to your **intermediate certificate** and click ***"Next"***.

### Link the GPO

1. Close the GPO and Right-click on the domain or OU you wish to deploy the certificate to and select ***"Link and existing GPO"*** then choose the GPO you just created.

You can now either wait for group policy to update or run "gpupdate /force" on clients.