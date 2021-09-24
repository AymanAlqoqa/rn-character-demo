# rn-character-demo

### This demo demonstrate how to use DeepLinking inaddition to GraphQl.

### To use repo., please follow these steps:
- clone the repo.
- yarn install
- expo start

### To test the app from expo:
- use this line (exp://exp.host/@aymanalqoqa/rn-character-demo)

### To test deepLinking from your mobile, open Opera Browser(in android), then type this address:
  - (home screen) -->    exp://exp.host/@aymanalqoqa/rn-character-demo/--/home
  - (details screen) -->    exp://exp.host/@aymanalqoqa/rn-character-demo/--/details?id=1
     - id maybe any no. from 1 to 671
     - if id is not added in the query, the app assumes id=1 as default
   
 ### To test deepLinking within emulator type this line in cli(note --> port may change):
  - (home screen) -->    npx uri-scheme open exp://127.0.0.1:19000/--/home --android
  - (details screen) -->    npx uri-scheme open exp://127.0.0.1:19000/--/details?id=10 --android
  
  Thanks
 --------------- 
  Ayman
  
  Full Stack Web/Mobile Dev.
  
  aalqouqa@gmail.com
