# EzBike-北市找單車很easy
 EzBike為一款台北市Ubike站點資訊平台，使用者可以在主頁瀏覽台北市所有Ubike單車站點即時資訊。  
詳細功能請參閱「[主要功能](#主要功能)」。
  
  
**👉首頁搜尋頁（網站入口）**
<img width="919" alt="EzBike桌機圖" src="https://user-images.githubusercontent.com/71853581/214869006-c8dbe7c9-cb18-436f-ba08-dee5c023772f.png">

**👉導航頁**
<img width="943" alt="EzBike桌機導航圖" src="https://user-images.githubusercontent.com/71853581/214869106-fed0eabe-7004-486f-a1cd-568ebf38559c.png">


## 主要功能
【首頁搜尋頁】
- 使用者可以瀏覽所有台北市Ubike各站點停車位、剩餘車輛數最新資訊(每分鐘即時更新)。
- 使用者可以在輸入框輸入地點，會自動出現建議選項或地名，快速使用。
- 使用者可以點擊加入最愛站點，下次打開網頁時會保留出現，滑鼠觸及時，Google地圖會以站點為中心顯示。
- 使用者可以取消最愛站點。
- 桌機版地圖左側最愛站點清單會提醒車位或借車數量不足，手機版則顯示於上方折合選單。
- 使用者可按規劃路線，會導向導航頁並自動輸入目的地。
- 使用者可以點選地圖上紫色箭頭，同意記錄您的GPS定位，再次點擊時會移至您的目前定位。
- 使用者未點擊點擊地圖上紫色箭頭，不會自動搜尋您的定位，保護個人隱私。

【導航頁】
- 導航有三種模式，公車、捷運和單車，使用者必須輸入完整啟程地和目的地才會顯示建議路線和時間。
- 啟程地和目的地會顯示周圍Ubike鄰近站點，幫助您沒停車位時能夠有備案。


## 本地安裝流程

1. 開啟終端機(Terminal)，並確認已安裝 node.js 與 npm 
2. 在終端機輸入以下指令，將本專案 clone 到本機電腦

```
git clone https://github.com/yhosutun2490/EzBike.git
```

3. 透過終端機進入存放此專案的資料夾後，輸入以下指令安裝 npm 套件

```
npm install
```

4. 安裝完畢後請輸入以下指令執行專案

```
npm start
```

6. 打開瀏覽器輸入以下網址即可開始使用本專案

```
http://localhost:3000/
```

7. 如欲退出專案可使用以下快捷鍵

```
ctrl + C
```

## 開發工具

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Node.js 14.18.1
- Next.js 13.1.1
- React.js 18.2.0
- @react-google-maps/api 2.17.1
- @use-places-autocomplete 4.0.0


## 開發人員

- [Rafael](https://github.com/yhosutun2490)
