Encrypt public key:
age1dcn8fsqv9qhxgasah2qaq7s46vk93s68x0rfh2qswdzw0pyl9vzsag8pj7

sops --encrypt filename.yaml --age age1dcn8fsqv9qhxgasah2qaq7s46vk93s68x0rfh2qswdzw0pyl9vzsag8pj7

Execute a command:
npm run start -- print-text --text Welcome

1. Set up private keys

2. How to encrypt a file

```
sops --encrypt --age age1dcn8fsqv9qhxgasah2qaq7s46vk93s68x0rfh2qswdzw0pyl9vzsag8pj7 config/<filename>.yaml > config/<filename>.enc.yaml
```

3. How to edit an encrypted file

```
sops configs/<filename>.enc.yaml
```
