//[1]�ϐ��A�z���錾����ꏊ

//[1-1]�w�i�̃X�N���[��
var bgX = 0;


//[1-2]���@�̊Ǘ�
var ssX = 0;
var ssY = 0;
var automa = 0;
var energy = 0;
var muteki = 0;
var weapon = 0;
var laser = 0;



//[1-3]�e���Ǘ�����ϐ��Ɣz���錾
var MSL_MAX = 100;
var mslX = new Array(MSL_MAX);
var mslY = new Array(MSL_MAX);
var mslXp = new Array(MSL_MAX);
var mslYp = new Array(MSL_MAX);
var mslF = new Array(MSL_MAX);
var mslImg = new Array(MSL_MAX);
var mslNum = 0;



//[1-4]���́i�G�@�j���Ǘ�����z��
var OBJ_MAX = 1000;                 //���̒l������������ƒe���������ċ@�̂������Ă����z��ɒe���㏑������ċ@�̂������āA�܂�����e�𔭎˂�������B
var objType = new Array(OBJ_MAX);   //�O���G�̒e�@�P���G�@�@//�e���@�̂����O���P���Ŕ��ʂ���B�@�̂Ȃ�e���ˊ֐��ɓ����Ēe�𔭎˂��A�e���g�Ȃ�֐����̒e���ˊ֐����X���[����B
var objImg = new Array(OBJ_MAX);    //����̏������ƂɓG�@�̔ԍ����n�����B����ČĂяo���ۂɎ����Ŕԍ������߂Ĉ����ɑł����ށB10�b���Ƃ��ƂT�Ԃ̓G�@�̉摜�ɂȂ铙
var objX = new Array(OBJ_MAX);      //������Ԃ�ύX��̕`�悷��X���W��ێ�����
var objY = new Array(OBJ_MAX);      //������Ԃ�ύX��̕`�悷��Y���W��ێ�����
var objXp = new Array(OBJ_MAX);     //���̃I�u�W�F�N�g����Y�������̕ω���ێ�����
var objYp = new Array(OBJ_MAX);     //���̃I�u�W�F�N�g����Y�������̕ω���ێ�����
var objLife = new Array(OBJ_MAX);   //�G���̃��C�t������z��
var objF = new Array(OBJ_MAX);      //�`�悷��itrue�j���A���Ȃ��ifalse�j�������߂�z��
var objNum = 0;                     //�I�u�W�F�N�g��������邲�Ƃɉ��Z����Ă����ő�l�̂Ƃ���ł܂��O�ɖ߂�B



//[1-6]�G�t�F�N�g���Ǘ�����z��
var EFCT_MAX = 100;
var efctX = new Array(EFCT_MAX);
var efctY = new Array(EFCT_MAX);
var efctN = new Array(EFCT_MAX);
var efctNum = 0;



//[1-7]���̑��Q�[���i�s�ɕK�v�ȕϐ�����
var idx = 0;                //�^�C�g�����̃Q�[���̐i�s�󋵂��Ǘ�
var tmr = 0;                //�^�C�}�[�B���C�����[�v���ŉ��Z���ꑱ���邯�Ǒ��v��
var score = 0;              //�X�R�A�̒l
var hiscore = 10000;        //�n�C�X�R�A�̒l
var stage = 0;              //�X�e�[�W��






//[2]�֐���錾����ꏊ


//[2-1]�w�i�̕`��Ɋւ���֐�
function drawBG(spd) {
    bgX = (bgX + spd) % 1200;
    drawImg(0, -bgX, 0);            //drawImg(�摜�ԍ�,�@�����X���W,�@�����Y���W)
    drawImg(0, 1200 - bgX, 0);
    var hy = 580;                   //�n�ʂ̒n������Y���W
    var ofsx = bgX % 40;            //�c���C�����ړ�������I�t�Z�b�g�l
    lineW(2)                        //���̑�����ݒ肷��W���֐�

    //�n�ʂ̐��̕`��
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


//[2-2]���@�̍��W������������֐�
function initSShip() {
    ssX = 400;          //������Ԃ�X���W
    ssY = 360;          //������Ԃ�Y���W
    energy = 10;
    weapon = 0;
    laser = 0;
    //muteki = 0;   //�ʏ평�������Ȃ��Ƃ����Ȃ����ŏ��ɂ��������O�������Ă���̂ŋN�����ɂ�muteki�͂O�B�ĊJ���鎞�ɂ�30���������܂܂ɂȂ��Ă���ŏ��������Ȃ��Ă��������Ă�����x�����オ�銴�������o�ł���B
}


//[2-3]���@�𓮂����֐�
function moveSShip() {

    if (key[37] > 0 && ssX > 60)    ssX -= 20;  //���̕����L�[����������
    if (key[39] > 0 && ssX < 1000)  ssX += 20;  //�E�̕����L�[����������
    if (key[38] > 0 && ssY > 40)    ssY -= 20;  //��̕����L�[����������
    if (key[40] > 0 && ssY < 680) ssY += 20;    //���̕����L�[����������

    if (key[65] == 1) {                         //a�L�[����������
        key[65]++;
        automa = 1 - automa;                    //�������˂�ON/OFF�ɐ؂�ւ���Bauotma���O�̏ꍇ�͂P�ɂȂ�A�P�̏ꍇ�͂O�ɂȂ�B�r���I�_���a�݂����Ȋ���
    }

    if (automa == 0 && key[32] == 1) {          //�X�y�[�X�L�[�������ꂽ��
        key[32]++;                              //���Z���邱�ƂŃX�y�[�X�L�[���������܂܂��ƒe���o�Ȃ��Ȃ�
        setWeapon();                            //�e����֐����Ăяo��
    }

    if (automa == 1 && tmr % 8 == 0) setWeapon();


    //��ʂ̉E��ɔ��ˏ�Ԃ��ǂ����������邽�߂̃e�L�X�g��\������B�f�t�H���g�ō��A���ˏ�ԂȂ甒�B
    var col = "black";
    if (automa == 1) col = "white";
    fRect(900, 20, 280, 60, "blue");
    fText("[A]uto Missile", 1040, 50, 36, col);             //fText(������,�@X,�@Y,�@�t�H���g�̑傫��,�@�F)

    //�X�}�z�Ń^�b�v�����ꏊ��auto�̏ꏊ�Ȃ�auto���I���ɂ��A�Ⴄ�ꏊ�Ȃ�^�b�v���ꂽ�ꏊ�ɋ@�̂��߂Â���B
    if (tapC > 0) {
        if (900 < tapX && tapX < 1180 && 20 < tapY && tapY < 80) {
            tapC = 0;
            automa = 1 - automa;
        }
        //�U�Ŋ����Ă��闝�R��ssX�͖�����Z�����̂ň��ł��̏�ɏu�Ԉړ�����̂ł͂Ȃ��Z��ɕ����ă^�b�v�����ꏊ�ɋ߂Â��Ă���B����ɂ��`���͂������߂Â��Ă���悤�Ɍ�����B
        else {
            ssX = ssX + int((tapX - ssX) / 6);      
            ssY = ssY + int((tapY - ssY) / 6);
        }
    }

    //�G�ɓ����������̓_�œ���B�G�ɓ�����������muteki��30���������A���ꂪ�O�ɂȂ�܂Ń}�C�i�X�����B���̌o�߂ŋ����̎������v���C���[��\�����Ă���̂œ_�ł��Ă���݂����ɂȂ�
    if (muteki % 2 == 0) drawImgC(1, ssX, ssY);             //drawCenter(�摜�ԍ�,�@���SX,�@���SY)    X�AY�����S�̍��W
    if (muteki > 0) muteki--;
}



//[2-4]�~�T�C�����Ǘ�����z�������������֐�
function initMisile() {
    for (var i = 0; i < mslF; i++) {
        malF[i] = false;
    }
    mslNum = 0;
}


//[2-5]�~�T�C�������Z�b�g����֐�
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

//[2-6]�~�T�C���𓮂����֐�
function moveMissle() {
    for (var i = 0; i < MSL_MAX; i++) {     //���܂ŌĂяo�����~�T�C���S�Ă����B���̂Ȃ炢�������e���Ȃ��Ȃ�����mslNum���O����ɂ���̂��ʓ|��������B
        if (mslF[i] == true) {              //�~�T�C����`�悵�Ă悢�̂Ȃ�

            mslX[i] = mslX[i] + mslXp[i];
            mslY[i] = mslY[i] + mslYp[i];
            drawImgC(mslImg[i], mslX[i], mslY[i]);

            if (mslX[i] > 1200) mslF[i] = false;        //�\���͈͂��o�������

        }
    }
}


//[2-7]���́i�G�@�j������������֐�
function initObject() {
    for (var i = 0; i < OBJ_MAX; i++) objF[i] = false;
    objNum = 0;
}


//[2-8]���́i�G�@�ƒe�j���Z�b�g����֐�
function setObject(typ, png, x, y, xp, yp, lif) {
    objType[objNum] = typ;                  //�O���G�̒e�@�P���G�@�@//�e���@�̂����O���P���Ŕ��ʂ���B�@�̂Ȃ�e���ˊ֐��ɓ����Ēe�𔭎˂��A�e���g�Ȃ�֐����̒e���ˊ֐����X���[����B
    objImg[objNum] = png;                   //����̏������ƂɓG�@�̔ԍ����n�����B����ČĂяo���ۂɎ����Ŕԍ������߂Ĉ����ɑł����ށB10�b���Ƃ��ƂT�Ԃ̓G�@�̉摜�ɂȂ铙
    objX[objNum] = x;                       //������Ԃ�ύX��̕`�悷��X���W��ێ�����
    objY[objNum] = y;                       //������Ԃ�ύX��̕`�悷��Y���W��ێ�����
    objXp[objNum] = xp;                     //���̃I�u�W�F�N�g����Y�������̕ω���ێ�����
    objYp[objNum] = yp;                     //���̃I�u�W�F�N�g����Y�������̕ω���ێ�����
    objLife[objNum] = lif;                  //�������Ă�Γ|���邩�̒l
    objF[objNum] = true;                    //�`�悷��itrue�j���A���Ȃ��ifalse�j�������߂�z��
    objNum = (objNum + 1) % OBJ_MAX;        //�I�u�W�F�N�g��������邲�Ƃɉ��Z����Ă����ő�l�̂Ƃ���ł܂��O�ɖ߂�B
}


//[2-9]���́i�G�@�ƒe�j�𓮂����֐�
function moveObject() {

    for (var i = 0; i < OBJ_MAX; i++) {
        if (objF[i] == true) {

            objX[i] = objX[i] + objXp[i];
            objY[i] = objY[i] + objYp[i];

            //�G�Q�̓���
            if (objImg[i] == 6) {
                if (objY[i] < 60) objYp[i] = 8;
                if (objY[i] > 660) objYp[i] = -8;
            }

            //�G�R�̓���
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

            //�G�ƃ~�T�C���̓����蔻��
            if (objType[i] == 1) {          //�G�̋@�̂Ȃ�i�O��������G�̒e�j
                var r = 12 + (img[objImg[i]].width + img[objImg[i]].height) / 4;    //�����̒e�̂����蔻����~�`�̒��a�P�Q�Ƃ����B�㔼�̎��͊ȈՓI�ɓG�@�̔��a���o���Ă���

                for (var n = 0; n < MSL_MAX; n++) {     //�~�T�C���S�Ă����
                    if (mslF[n] == true) {              //���݂̃~�T�C�����`�悳��Ă���Ȃ�
                        //���݂̃~�T�C���ƓG�̋@�̂̒��S���������̒��S������菬�����Ȃ�
                        if (getDis(objX[i], objY[i], mslX[n], mslY[n]) < r) {//getDis��wws.js�ɑ��݂���Q�_�Ԃ̋������v�Z����

                            if(mslImg[n] == 2) {
                                mslF[n] = false;
                            }

                            objLife[i]--;

                            //�G�̃��C�t���O�Ȃ�
                            if (objLife[i] == 0) {
                                objF[i] = false;                       //�~�T�C�����G�̋@�̂ɓ��������Ƃ��ēG������
                                score = score + 100;
                                if(score > hiscore) hiscore = score;
                                setEffect(objX[i], objY[i], 9);        //�ŏ��̉摜����Z�b�g����i���̌��drawEffect������Ƀ��C���̒��Ŏ��̉摜�ɕύX���Ă����j
                            }
                            //�c���Ă���̂Ȃ�
                            else {
                                setEffect(objX[i], objY[i], 3);        //�r���̉摜����Z�b�g����
                            }

                        }
                    }
                }
            }

            //�v���C���[�ƒe�̓����蔻��
            if (idx == 1){
                var r = 30 + (img[objImg[i]].width + img[objImg[i]].height) / 4;

                if (getDis(objX[i], objY[i], ssX, ssY) < r) {
                    if (objType[i] <= 1 && muteki == 0) {

                        objF[i] = false;
                        energy--;
                        muteki = 30;

                        //�G�l���M�[0�ŃQ�[���I�[�o�[��
                        if(energy == 0) {
                            idx = 2;
                            tmr = 0;
                            stopBgm();
                        }
                    }
                    //�����́A���ꂪ�����蔻��̊O�ɂ����̂ŋ����I�ɉ摜��������Ă����B�����蔻��̒��ɓ����Γ����������ɏ���
                    if (objType[i] == 2) {
                        objF[i] = false;
                        if (objImg[i] ==  9 && energy < 10) energy++;
                        if (objImg[i] == 10) weapon++;
                        if (objImg[i] == 11) laser = laser + 100;
                    }
                }    
            }   
            //�`��͈͂Əo���ꏊ�����O�ɏo����
            if (objX[i] < -100 || objX[i] > 1300 || objY[i] < -100 || objY[i] > 820) objF[i] = false;
            
        }
    }
}


//[2-10]�G�t�F�N�g�̔z�������������֐�
function initEffect() {
    for (var i = 0; i < EFCT_MAX; i++) efctN[i] = 0;
    efctNum = 0;
}


//[2-11]�G�t�F�N�g���Z�b�g����֐�
function setEffect(x, y, n) {
    efctX[efctNum] = x;
    efctY[efctNum] = y;
    efctN[efctNum] = n;                     //�����ɂO���傫���l�����邱�ƂŁAdrawEffet�֐�����if���̏������s����
    efctNum = (efctNum + 1) % EFCT_MAX;
}

//[2-12]�G�t�F�N�g��\������֐�
function drawEffect() {
    for (var i = 0; i < EFCT_MAX; i++) {
        if (efctN[i] > 0) {
            drawImgTS(3, (9 - efctN[i]) * 128, 0, 128, 128, efctX[i] - 64, efctY[i] - 64, 128, 128);
            efctN[i]--;
        }
    }
}

//[2-13]�S��ނ̓G���o��������֐�
function setEnemy() {

    var sec = int(tmr / 30);        //�o�ߕb��

    //setObject(typ, png�i�G�̉摜�ԍ��j, x, y, xp, yp, lif)
    //34�`40�b�̎�
    if (4 <= sec && sec < 10) {
        if (tmr % 20 ==  0) setObject(1, 5, 1300, 60 + rnd(600), -16, 0, 1 * stage);        //�G�P
    }
    //44�`50�b�̎�
    if (14 <= sec && sec < 20) {
        if (tmr % 20 == 0) setObject(1, 6, 1300, 60 + rnd(600), -12, 8, 3 * stage);         //�G�Q
    }
    //54�`60�b�̎�
    if (24 <= sec && sec < 30) {
        if (tmr % 20 == 0) setObject(1, 7, 1300, 360 + rnd(300), -48, -10, 5 * stage);      //�G�R
    }
    //64�`80�b�̎�
    if (34 <= sec && sec < 50) {
        if (tmr % 60 == 0) setObject(1, 8, 1300, rnd(720 - 192), -6, 0, 0);                 //��Q��
    }
    //84�`100�b�̎�
    if (54 <= sec && sec < 70) {
        if (tmr % 20 ==  0) {
            setObject(1, 5, 1300,  60 + rnd(300), -16,  4, 1 * stage);        //�G�P
            setObject(1, 5, 1300, 360 + rnd(300), -16, -4, 1 * stage);        //�G�P
        }
    }
    //104�`120�b�̎�
    if (74 <= sec && sec < 90) {
        if (tmr % 20 == 0) setObject(1, 6, 1300, 60 + rnd(600), -12, 8, 3 * stage);         //�G�Q
        if (tmr % 45 == 0) setObject(1, 8, 1300, rnd(720 - 192), -8, 0, 0);                 //��Q��
    }
    //124�`140�b�̎�
    if (74 <= sec && sec < 110) {
        if (tmr % 10 == 0) setObject(1, 5, 1300, 360, -24, rnd(11) - 5, 1 * stage);         //�G�P
        if (tmr % 20 == 0) setObject(1, 7, 1300, rnd(300), -56, 4 + rnd(12), 5 * stage);    //�G�R
    }
}

//[2-14]�����̒e����x�ɕ��֐�
function setWeapon() {
    var n = weapon;
    if (n > 8) n = 8;
    for (var i = 0; i <= n; i++) setMissile(ssX + 40, ssY - n * 6 + i * 12, 40, int((i - n / 2) * 2));
}

//[2-15]�A�C�e�����o��������֐�
function setItem() {
    if(tmr%900 ==   0) setObject(2,  9, 1300, 60+rnd(600), -10, 0, 0);// Energy
    if(tmr%900 == 300) setObject(2, 10, 1300, 60+rnd(600), -10, 0, 0);// Missile
    if(tmr%900 == 600) setObject(2, 11, 1300, 60+rnd(600), -10, 0, 0);// Laser
}


//�N�����̏���
function setup() {

    canvasSize(1200, 720);            //�L�����o�X�̃T�C�Y��ݒ肷��

    //�摜�̓ǂݍ��݁B��ڂ̈����͉摜�ԍ��B
    loadImg(0, "image/bg.png");
    loadImg(1, "image/spaceship.png");
    loadImg(2, "image/missile.png");
    loadImg(3, "image/explode.png");

    //�G�̉摜��S�ēǂݍ���ł���
    for (var i = 0; i <= 4; i++) {
        loadImg(4 + i, "image/enemy" + i + ".png");
    }

    //�A�C�e���̉摜��S�ēǂݍ���ł���
    for (var i = 0; i <= 2; i++) {
        loadImg(9 + i, "image/item" + i + ".png");
    }

    loadImg(12, "image/laser.png");     //���[�U�[�̉摜
    loadImg(13, "image/title_ss.png");  //�^�C�g�����S

    //�I�u�W�F�N�g�̏��������
    initSShip();
    initMisile();
    initEffect();
    initObject();

    loadSound(0, "sound/bgm.m4a");
}


//���C�����[�v
function mainloop() {
    tmr++;     //�[���I�ȃ^�C�}�[�B���̊Ԋu�ŉ��Z���ꑱ����̂Ō��܂����^�C�~���O�Ōv�Z����Έ��̊Ԋu�œG���Ăяo����
    drawBG(1);
    switch (idx) {

        //�^�C�g�����
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

        //�Q�[����
        case 1:
            setEnemy();
            setItem();
            moveSShip();
            moveMissle();
            moveObject();
            drawEffect();

            //�G�l���M�[�o�[�̕\���B���ɐԐF�̎l�p�����A��ɒi�X�ƐF���ɂȂ�ΐF���d�ˏ������Ă���B
            for (var i = 0; i < 10; i++) fRect(20+i*30, 660, 20, 40, "#c00000");
            for (var i = 0; i < energy; i++) fRect(20 + i * 30, 660, 20, 40, colorRGB(160 - 16 * i, 240 - 12 * i, 24 * i));

            if (tmr < 30 * 4) fText("STAGE" + stage, 600, 300, 50, "cyan");
            if (30 * 114 < tmr && tmr < 30 * 118) fText("STAGE CLEAR", 600, 300, 50, "cyan");
            if (tmr == 30 * 120) {
                stage++;
                tmr = 0;
            }

        break;

        //�Q�[���I�[�o�[
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