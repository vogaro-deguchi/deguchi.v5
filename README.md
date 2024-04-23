・~root #任意の場所の作業ディレクトリのルート
┗　docker #Dockerfile用ディレクトリ
┃ ┣ node
┃ ┗　　Dockerfile
┗　www
  ┗　html #デプロイ先のディレクトリ
    ┗　assets
      ┣ css
      ┣ images
      ┗　　js #書き出されたJSファイルが格納される
        ┗　　modules  #書き出されたJSのmoduleファイルが格納される
      ┗　　css
        ┗　　style.css
  ┗　　src #作業用ディレクトリ
  　　　┗　　index.html
  　　　┗　　aboutus
    　　　┗　　index.html
  　　　　┗　　js
  　  　　┣ main.js #Viteが作成したファイル
  　  　　┗　　[使用するJavaScriptの各ファイル名など].js
  　　　　┗　　lib
    　　　┗　　components #EJSで使用するHTMLコンポーネントファイルを格納
    　　　　　　　┗　　metadata.ejs
     　　┗　　pagedata #EJSで使用するデータ(JSON）ファイルを格納
    　　　　　　　　┗　　pagedata.json
  　　　　　┗　　public #public ディレクトリ
  　  　　　　┗　　assets
    　  　　　　┗　　images #使用する画像を入れておく
  　　　　　　┗　　scss #構造は任意で
    　　　　　┗　　css
      　　　　　┗　　style.scss
    　└・components
      　└・_[各コンポーネントファイル名].scss
  └・.gitignore
┣ docker-compose.yml 
└・.env #Dockerのためのファイル
