---
title: Install Gemini-CLI on WSL2 Ubuntu
date: 2026-01-05T03:00:21-08:00
draft: "false"
---

Gemini-cli requires > v20. Grab the URI to the latest release from https://deb.nodesource.com.

Download and run the script to add the NodeJS PPA.

```bash
curl -fsSL https://deb.nodesource.com/<version>.x | sudo bash -
```

Install NodeJS

```bash
sudo apt-get install -y nodejs
```

Verify Installation

```
node -v
```