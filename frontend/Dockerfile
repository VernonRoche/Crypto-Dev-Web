#create node environment
FROM node:14

# create directory app 
WORKDIR /usr/src/app


#Copy package to app 
COPY package*.json ./
RUN npm install

#COPY source code to app 
COPY . .






EXPOSE 5173
CMD ["npm","run","dev"] 