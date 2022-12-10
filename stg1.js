//[1]変数、配列を宣言する場所

//[1-1]背景のスクロール
var bgX = 0;


//[1-2]自機の管理
var ssX = 0;
var ssY = 0;
var automa = 0;
var energy = 0;
var muteki = 0;
var weapon = 0;
var laser = 0;



//[1-3]弾を管理する変数と配列を宣言
var MSL_MAX = 100;
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslImg = new Array(MSL_MAX);
var mslNum = 0;



//[1-4]物体（敵機）を管理する配列
var OBJ_MAX = 1000;                 //この値を小さくすると弾が多すぎて機体が入っていた配列に弾が上書きされて機体が消えて、また現れ弾を発射し消える。
var objType = new Array(OBJ_MAX);   //０＝敵の弾　１＝敵機　//弾か機体かを０か１かで判別する。機体なら弾発射関数に入って弾を発射し、弾自身なら関数内の弾発射関数をスルーする。
var objImg = new Array(OBJ_MAX);    //特定の条件ごとに敵機の番号が渡される。よって呼び出す際に自分で番号を決めて引数に打ち込む。10秒ごとだと５番の敵機の画像になる等
var objX = new Array(OBJ_MAX);      //初期状態や変更後の描画するX座標を保持する
var objY = new Array(OBJ_MAX);      //初期状態や変更後の描画するY座標を保持する
var objXp = new Array(OBJ_MAX);     //そのオブジェクト毎のY軸方向の変化を保持する
var objYp = new Array(OBJ_MAX);     //そのオブジェクト毎のY軸方向の変化を保持する
var objLife = new Array(OBJ_MAX);   //敵毎のライフを入れる配列
var objF = new Array(OBJ_MAX);      //描画する（true）か、しない（false）かを決める配列
var objNum = 0;                     //オブジェクトが一つ増えるごとに加算されていき最大値のところでまた０に戻る。



//[1-6]エフェクトを管理する配列
var EFCT_MAX = 100;
var efctX = new Array(EFCT_MAX);
var efctY = new Array(EFCT_MAX);
var efctN = new Array(EFCT_MAX);
var efctNum = 0;



//[1-7]その他ゲーム進行に必要な変数たち
var idx = 0;                //タイトル等のゲームの進行状況を管理
var tmr = 0;                //タイマー。メインループ内で加算され続けるけど大丈夫か
var score = 0;              //スコアの値
var hiscore = 10000;        //ハイスコアの値
var stage = 0;              //ステージ数






//[2]関数を宣言する場所


//[2-1]背景の描画に関する関数
function drawBG(spd) {
    bgX = (bgX + spd) % 1200;
    drawImg(0, -bgX, 0);            //drawImg(画像番号,　左上のX座標,　左上のY座標)
    drawImg(0, 1200 - bgX, 0);
    var hy = 580;                   //地面の地平線のY座標
    var ofsx = bgX % 40;            //縦ラインを移動させるオフセット値
    lineW(2)                        //線の太さを設定する標準関数

    //地面の線の描画
    for (var i = 1; i <= 30; i++) {
        var tx = i*40 - ofsx;
        var bx = i*240 - ofsx*6 - 3000;
        line(tx, hy, bx, 720, "silver");
    }
    for (var i = 0; i < 12; i++) {
        lineW(1 + int(i / 3));
        line(0, hy, 1200, hy, "gray");
        hy = hy + i*2;
    }
}


//[2-2]自機の座標を初期化する関数
function initSShip() {
    ssX = 400;          //初期状態のX座標
    ssY = 360;          //初期状態のY座標
    energy = 10;
    weapon = 0;
    laser = 0;
    //muteki = 0;   //通常初期化しないといけないが最初にそもそも０が入っているので起動時にはmutekiは０。再開する時には30が入ったままになっているで初期化しなくても負傷してもう一度立ち上がる感じを演出できる。
}


//[2-3]自機を動かす関数
function moveSShip() {

    if (key[37] > 0 && ssX > 60)    ssX -= 20;  //左の方向キーを押したら
    if (key[39] > 0 && ssX < 1000)  ssX += 20;  //右の方向キーを押したら
    if (key[38] > 0 && ssY > 40)    ssY -= 20;  //上の方向キーを押したら
    if (key[40] > 0 && ssY < 680) ssY += 20;    //下の方向キーを押したら

    if (key[65] == 1) {                         //aキーを押したら
        key[65]++;
        automa = 1 - automa;                    //自動発射をON/OFFに切り替える。auotmaが０の場合は１になり、１の場合は０になる。排他的論理和みたいな感じ
    }

    if (automa == 0 && key[32] == 1) {          //スペースキーが押されたら
        key[32]++;                              //加算することでスペースキーを押したままだと弾が出なくなる
        setWeapon();                            //弾を放つ関数を呼び出す
    }

    if (automa == 1 && tmr % 8 == 0) setWeapon();


    //画面の右上に発射状態かどうか見分けるためのテキストを表示する。デフォルトで黒、発射状態なら白。
    var col = "black";
    if (automa == 1) col = "white";
    fRect(900, 20, 280, 60, "blue");
    fText("[A]uto Missile", 1040, 50, 36, col);             //fText(文字列,　X,　Y,　フォントの大きさ,　色)

    //スマホでタップした場所がautoの場所ならautoをオンにし、違う場所ならタップされた場所に機体を近づける。
    if (tapC > 0) {
        if (900 < tapX && tapX < 1180 && 20 < tapY && tapY < 80) {
            tapC = 0;
            automa = 1 - automa;
        }
        //６で割っている理由はssXは毎回加算されるので一回でその場に瞬間移動するのではなく六回に分けてタップした場所に近づけている。これにより描画上はゆっくり近づいているように見える。
        else {
            ssX = ssX + int((tapX - ssX) / 6);      
            ssY = ssY + int((tapY - ssY) / 6);
        }
    }

    //敵に当たった時の点滅動作。敵に当たった時にmutekiに30が代入され、それが０になるまでマイナスされる。その経過で偶数の時だけプレイヤーを表示しているので点滅しているみたいになる
    if (muteki % 2 == 0) drawImgC(1, ssX, ssY);             //drawCenter(画像番号,　中心X,　中心Y)    X、Yが中心の座標
    if (muteki > 0) muteki--;
}



//[2-4]ミサイルを管理する配列を初期化する関数
function initMisile() {
    for (var i = 0; i < mslF; i++) {
        malF[i] = false;
    }
    mslNum = 0;
}


//[2-5]ミサイルををセットする関数
function setMissile(x, y, xp, yp) {
    mslX[mslNum] = x;
    mslY[mslNum] = y;
    mslXp[mslNum] = xp;
    mslYp[mslNum] = yp;
    mslF[mslNum] = true;
    mslImg[mslNum] = 2;
    if (laser > 0) {
        laser--;
        mslImg[mslNum] = 12;
    }
    mslNum = (mslNum + 1) % MSL_MAX;
}

//[2-6]ミサイルを動かす関数
function moveMissle() {
    for (var i = 0; i < MSL_MAX; i++) {     //今まで呼び出したミサイル全てを回る。何故ならいちいち弾がなくなったらmslNumを０からにするのが面倒さいから。
        if (mslF[i] == true) {              //ミサイルを描画してよいのなら

            mslX[i] = mslX[i] + mslXp[i];
            mslY[i] = mslY[i] + mslYp[i];
            drawImgC(mslImg[i], mslX[i], mslY[i]);

            if (mslX[i] > 1200) mslF[i] = false;        //表示範囲を出たら消す

        }
    }
}


//[2-7]物体（敵機）を初期化する関数
function initObject() {
    for (var i = 0; i < OBJ_MAX; i++) objF[i] = false;
    objNum = 0;
}


//[2-8]物体（敵機と弾）をセットする関数
function setObject(typ, png, x, y, xp, yp, lif) {
    objType[objNum] = typ;                  //０＝敵の弾　１＝敵機　//弾か機体かを０か１かで判別する。機体なら弾発射関数に入って弾を発射し、弾自身なら関数内の弾発射関数をスルーする。
    objImg[objNum] = png;                   //特定の条件ごとに敵機の番号が渡される。よって呼び出す際に自分で番号を決めて引数に打ち込む。10秒ごとだと５番の敵機の画像になる等
    objX[objNum] = x;                       //初期状態や変更後の描画するX座標を保持する
    objY[objNum] = y;                       //初期状態や変更後の描画するY座標を保持する
    objXp[objNum] = xp;                     //そのオブジェクト毎のY軸方向の変化を保持する
    objYp[objNum] = yp;                     //そのオブジェクト毎のY軸方向の変化を保持する
    objLife[objNum] = lif;                  //何発当てれば倒せるかの値
    objF[objNum] = true;                    //描画する（true）か、しない（false）かを決める配列
    objNum = (objNum + 1) % OBJ_MAX;        //オブジェクトが一つ増えるごとに加算されていき最大値のところでまた０に戻る。
}


//[2-9]物体（敵機と弾）を動かす関数
function moveObject() {

    for (var i = 0; i < OBJ_MAX; i++) {
        if (objF[i] == true) {

            objX[i] = objX[i] + objXp[i];
            objY[i] = objY[i] + objYp[i];

            //敵２の動き
            if (objImg[i] == 6) {
                if (objY[i] < 60) objYp[i] = 8;
                if (objY[i] > 660) objYp[i] = -8;
            }

            //敵３の動き
            if (objImg[i] == 7) {
                if (objXp[i] < 0) {

                    objXp[i] = int(objXp[i] * 0.95);

                    if (objXp[i] == 0) {
                        setObject(0, 4, objX[i], objY[i], -20, 0, 0);
                        objXp[i] = 20;
                    }
                }
            }

            drawImgC(objImg[i], objX[i], objY[i]);

            //敵とミサイルの当たり判定
            if (objType[i] == 1) {          //敵の機体なら（０だったら敵の弾）
                var r = 12 + (img[objImg[i]].width + img[objImg[i]].height) / 4;    //味方の弾のあたり判定を円形の直径１２とした。後半の式は簡易的に敵機の半径を出している

                for (var n = 0; n < MSL_MAX; n++) {     //ミサイル全てを回る
                    if (mslF[n] == true) {              //現在のミサイルが描画されているなら
                        //現在のミサイルと敵の機体の中心距離が元の中心距離より小さいなら
                        if (getDis(objX[i], objY[i], mslX[n], mslY[n]) < r) {//getDisはwws.jsに存在する２点間の距離を計算する

                            if(mslImg[n] == 2) {
                                mslF[n] = false;
                            }

                            objLife[i]--;

                            //敵のライフが０なら
                            if (objLife[i] == 0) {
                                objF[i] = false;                       //ミサイルが敵の機体に当たったとして敵を消す
                                score = score + 100;
                                if(score > hiscore) hiscore = score;
                                setEffect(objX[i], objY[i], 9);        //最初の画像からセットする（その後はdrawEffectが勝手にメインの中で次の画像に変更してくれる）
                            }
                            //残っているのなら
                            else {
                                setEffect(objX[i], objY[i], 3);        //途中の画像からセットする
                            }

                        }
                    }
                }
            }

            //プレイヤーと弾の当たり判定
            if (idx == 1){
                var r = 30 + (img[objImg[i]].width + img[objImg[i]].height) / 4;

                if (getDis(objX[i], objY[i], ssX, ssY) < r) {
                    if (objType[i] <= 1 && muteki == 0) {

                        objF[i] = false;
                        energy--;
                        muteki = 30;

                        //エネルギー0でゲームオーバーへ
                        if(energy == 0) {
                            idx = 2;
                            tmr = 0;
                            stopBgm();
                        }
                    }
                    //原因は、これが当たり判定の外にいたので強制的に画像が消されていた。当たり判定の中に入れれば当たった時に消す
                    if (objType[i] == 2) {
                        objF[i] = false;
                        if (objImg[i] ==  9 && energy < 10) energy++;
                        if (objImg[i] == 10) weapon++;
                        if (objImg[i] == 11) laser = laser + 100;
                    }
                }    
            }   
            //描画範囲と出現場所よりも外に出たら
            if (objX[i] < -100 || objX[i] > 1300 || objY[i] < -100 || objY[i] > 820) objF[i] = false;
            
        }
    }
}


//[2-10]エフェクトの配列を初期化する関数
function initEffect() {
    for (var i = 0; i < EFCT_MAX; i++) efctN[i] = 0;
    efctNum = 0;
}


//[2-11]エフェクトをセットする関数
function setEffect(x, y, n) {
    efctX[efctNum] = x;
    efctY[efctNum] = y;
    efctN[efctNum] = n;                     //ここに０より大きい値を入れることで、drawEffet関数内のif文の処理を行える
    efctNum = (efctNum + 1) % EFCT_MAX;
}

//[2-12]エフェクトを表示する関数
function drawEffect() {
    for (var i = 0; i < EFCT_MAX; i++) {
        if (efctN[i] > 0) {
            drawImgTS(3, (9 - efctN[i]) * 128, 0, 128, 128, efctX[i] - 64, efctY[i] - 64, 128, 128);
            efctN[i]--;
        }
    }
}

//[2-13]４種類の敵を出現させる関数
function setEnemy() {

    var sec = int(tmr / 30);        //経過秒数

    //setObject(typ, png（敵の画像番号）, x, y, xp, yp, lif)
    //34～40秒の時
    if (4 <= sec && sec < 10) {
        if (tmr % 20 ==  0) setObject(1, 5, 1300, 60 + rnd(600), -16, 0, 1 * stage);        //敵１
    }
    //44～50秒の時
    if (14 <= sec && sec < 20) {
        if (tmr % 20 == 0) setObject(1, 6, 1300, 60 + rnd(600), -12, 8, 3 * stage);         //敵２
    }
    //54～60秒の時
    if (24 <= sec && sec < 30) {
        if (tmr % 20 == 0) setObject(1, 7, 1300, 360 + rnd(300), -48, -10, 5 * stage);      //敵３
    }
    //64～80秒の時
    if (34 <= sec && sec < 50) {
        if (tmr % 60 == 0) setObject(1, 8, 1300, rnd(720 - 192), -6, 0, 0);                 //障害物
    }
    //84～100秒の時
    if (54 <= sec && sec < 70) {
        if (tmr % 20 ==  0) {
            setObject(1, 5, 1300,  60 + rnd(300), -16,  4, 1 * stage);        //敵１
            setObject(1, 5, 1300, 360 + rnd(300), -16, -4, 1 * stage);        //敵１
        }
    }
    //104～120秒の時
    if (74 <= sec && sec < 90) {
        if (tmr % 20 == 0) setObject(1, 6, 1300, 60 + rnd(600), -12, 8, 3 * stage);         //敵２
        if (tmr % 45 == 0) setObject(1, 8, 1300, rnd(720 - 192), -8, 0, 0);                 //障害物
    }
    //124～140秒の時
    if (74 <= sec && sec < 110) {
        if (tmr % 10 == 0) setObject(1, 5, 1300, 360, -24, rnd(11) - 5, 1 * stage);         //敵１
        if (tmr % 20 == 0) setObject(1, 7, 1300, rnd(300), -56, 4 + rnd(12), 5 * stage);    //敵３
    }
}

//[2-14]複数の弾を一度に放つ関数
function setWeapon() {
    var n = weapon;
    if (n > 8) n = 8;
    for (var i = 0; i <= n; i++) setMissile(ssX + 40, ssY - n * 6 + i * 12, 40, int((i - n / 2) * 2));
}

//[2-15]アイテムを出現させる関数
function setItem() {
    if(tmr%900 ==   0) setObject(2,  9, 1300, 60+rnd(600), -10, 0, 0);// Energy
    if(tmr%900 == 300) setObject(2, 10, 1300, 60+rnd(600), -10, 0, 0);// Missile
    if(tmr%900 == 600) setObject(2, 11, 1300, 60+rnd(600), -10, 0, 0);// Laser
}


//起動時の処理
function setup() {

    canvasSize(1200, 720);            //キャンバスのサイズを設定する

    //画像の読み込み。一つ目の引数は画像番号。
    loadImg(0, "image/bg.png");
    loadImg(1, "image/spaceship.png");
    loadImg(2, "image/missile.png");
    loadImg(3, "image/explode.png");

    //敵の画像を全て読み込んでいる
    for (var i = 0; i <= 4; i++) {
        loadImg(4 + i, "image/enemy" + i + ".png");
    }

    //アイテムの画像を全て読み込んでいる
    for (var i = 0; i <= 2; i++) {
        loadImg(9 + i, "image/item" + i + ".png");
    }

    loadImg(12, "image/laser.png");     //レーザーの画像
    loadImg(13, "image/title_ss.png");  //タイトルロゴ

    //オブジェクトの初期化作業
    initSShip();
    initMisile();
    initEffect();
    initObject();

    loadSound(0, "sound/bgm.m4a");
}


//メインループ
function mainloop() {
    tmr++;     //擬似的なタイマー。一定の間隔で加算され続けるので決まったタイミングで計算すれば一定の間隔で敵を呼び出せる
    drawBG(1);
    switch (idx) {

        //タイトル画面
        case 0:     
            drawImg(13, 200, 200);
            if (tmr % 40 < 20) fText("Press [SPC] or Click to start", 600, 540, 40, "cyan");
            if (key[32] > 0 || tapC > 0) {
                initSShip();
                initObject();
                score = 0;
                stage = 1;
                idx = 1;
                tmr = 0;
                playBgm(0);
            }

        break;

        //ゲーム中
        case 1:
            setEnemy();
            setItem();
            moveSShip();
            moveMissle();
            moveObject();
            drawEffect();

            //エネルギーバーの表示。下に赤色の四角たち、上に段々と色が青になる緑色を重ね書きしている。
            for (var i = 0; i < 10; i++) fRect(20+i*30, 660, 20, 40, "#c00000");
            for (var i = 0; i < energy; i++) fRect(20 + i * 30, 660, 20, 40, colorRGB(160 - 16 * i, 240 - 12 * i, 24 * i));

            if (tmr < 30 * 4) fText("STAGE" + stage, 600, 300, 50, "cyan");
            if (30 * 114 < tmr && tmr < 30 * 118) fText("STAGE CLEAR", 600, 300, 50, "cyan");
            if (tmr == 30 * 120) {
                stage++;
                tmr = 0;
            }

        break;

        //ゲームオーバー
        case 2:    
            if (tmr < 30 * 2 && tmr % 5 == 1) setEffect(ssX + rnd(120) - 60, ssY + rnd(80) - 40, 9);
            moveMissle();
            moveObject();
            drawEffect();
            fText("GAME OVER", 600, 300, 50, "red");
            if (tmr > 30 * 5) idx = 0;
            //console.log(muteki);

        break;
    }

    fText("SCORE " + score, 200, 50, 40, "white");
    fText("HISCORE " + hiscore, 600, 50, 40, "yellow");
  
}