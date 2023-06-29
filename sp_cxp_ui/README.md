## SigmaPlot15 Application Frontend

Install latest version of NodeJs from the NodeJs Official webiste https://nodejs.org

## Install

```bash
cd Sigmaplot15
yarn install
```

## Installing Redis 

For windows - Visit https://github.com/dmajkic/redis/downloads and download the binary. Navigate into folder and run the .exe file. 

For Linux/ macOSX - https://redis.io/download and downlaod/extract the binary.
Compile redis with
```bash
$ cd redis-{version}
$ make
```

The binaries that are now compiled are available in the src directory. Run Redis with:
```bash
$ src/redis-server
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Folder Structure

```
├───Sigmaplot15                           # Frontend folders and files
│   ├───assets                         
│   ├───src                                
│   │   ├───components                    # All components
│   │   │   ├───App
│   │   │   │   ├───App.global.css
│   │   │   │   └───App.tsx
│   │   │   ├───Graph
│   │   │   │   ├───Graph.tsx
│   │   │   │   └───GraphData.tsx
│   │   │   ├───Redis
│   │   │   │   └───data.tsx
│   │   │   ├───Report
│   │   │   │   ├───Report.tsx
│   │   │   │   └───ReportData.tsx
│   │   │   ├───Worksheet
│   │   │   │   ├───Worksheet.tsx
│   │   │   │   └───WorksheetData.tsx
│   │   ├───context
│   │   │   │   └───session
│   │   ├───domain
│   │   │   │   └───user
│   │   ├───hooks
│   │   ├───services
│   │   │   │   ├───GraphServices.tsx
│   │   │   │   ├───RedisServices.tsx
│   │   │   │   ├───ReportServices.tsx
│   │   │   │   ├───rte-data.txt
│   │   │   │   └───WorksheetServices.tsx
│   │   ├───utils
│   │   │   │   └───terh28.js
│   │   ├───index.html
│   │   ├───index.tsx
│   │   ├───main.dev.ts
│   │   ├───menu.ts
│   ├───package.json
│   ├───README.md
