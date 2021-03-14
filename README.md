# Pre-requisite
1. MySQL installed and running on default port
2. root account password of MySQL server set to `root`
3. `3000` port free (backend application will use this port)

# How to run
1. run `bootstrap.sql` in MySQL workbench / CLI
2. `npm i` in root directory
2. `npm start` in root directory
3. `cd frontend && npm i`
4. `npm start`
5. If Android Emulator is installed locally, press a  
  a. If not, download `Expo Go` app from App Store / Play Store to your device  
  b. scan the QR code printed in console output by `npm start`  
  c. alter the `baseURL` property to your device's IP address  
  ```
  File: frontend\apiClient\index.ts
  3: export default axios.create({
  4:     baseURL: "http://localhost:3000/api",
  5: });
  ```
6. login in the app with credentials
```
email: test@test.com
password: test
```