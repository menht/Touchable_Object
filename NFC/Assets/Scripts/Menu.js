#pragma strict

var obEnable : boolean = true; // 「作品を触ってみる」ボタンの表示・非表示を切り替えるためのトリガー
var descliptionEnable : boolean = true; //「この作品に関する説明を表示」ボタン表示の為のトリガー
var taEnable : boolean = false; // 説明ウィンドウ表示の為のトリガー
var backEnable : boolean = false; // 元に戻すボタン表示の為のトリガー
var descliptionBoxRect : Rect; // 説明ウインドウのサイズを可変にするための変数
var desRect : Rect;
var HideDesRect : Rect;
var TouchObjRect : Rect;
var HideObjRect : Rect;
var objRotate = Vector3(270,0,0);

var rotatetarget:Transform;
var xspeed:float = 50;
var yspeed:float = 50;

private var sx:float;
private var sy:float;
private var dx:float;
private var dy:float;
private var tx:float;
private var ty:float;

private var RotateVectorX:float;
private var RotateVectorY:float;
private var CashRotateVectorX:float;
private var CashRotateVectorY:float;

function Awake () {
	GameObject.Find("teapot").transform.Rotate(objRotate);
	Screen.orientation = ScreenOrientation.LandscapeLeft;
}

function FixedUpdate () {
	// 作品オブジェクトが表示されているときは説明ウィンドウの横幅をフルサイズにする
	if (this.backEnable){
		descliptionBoxRect = Rect(0,Screen.height-150,Screen.width,300);
	} else {
		descliptionBoxRect = Rect(0,0,Screen.width-200,Screen.height);
	}
}

function Update() {
	// オブジェクトぐりぐり
	if (0 < Input.touchCount) {
		if(Input.GetTouch(0).phase == TouchPhase.Began) {
			//Input Mouse position
			sx = Input.mousePosition.x;
			sy = Input.mousePosition.y;
		}
		if(Input.GetTouch(0).phase == TouchPhase.Moved) {
			dx = Input.mousePosition.x;
			dy = Input.mousePosition.y;
		
			tx = sx - dx;
			ty = sy - dy;
				
			//Rotate!
			RotateVectorX = tx / xspeed;
			RotateVectorY = ty / yspeed;
			rotatetarget.eulerAngles = Vector3( CashRotateVectorY + RotateVectorY , CashRotateVectorX + RotateVectorX , 0);
		}
		if(Input.GetTouch(0).phase == TouchPhase.Ended) {
			//Input Object position
			CashRotateVectorY = rotatetarget.eulerAngles.x;
			CashRotateVectorX = rotatetarget.eulerAngles.y;
	
		}
	}
}

var DesBtn : Texture2D;
var HideDes : Texture2D;
var TouchObj : Texture2D;
var HideObj : Texture2D;
function SetObject () {
	GameObject.Find("teapot").transform.Rotate(objRotate);
}

function OnGUI () {
	if (this.descliptionEnable){
		if (GUI.Button(Rect(Screen.width*1/6,Screen.hight,200,100),DesBtn)) {
			this.taEnable = true;
		}
	}
		if (this.taEnable) {
			this.descliptionEnable = false;
			GUI.Box(descliptionBoxRect,"テスト");
			if (GUI.Button(Rect(Screen.width-200,0,200,100),HideDes)) {
				this.taEnable =false;
				this.descliptionEnable = true;
			}
		}
	
    if (this.obEnable){
    	if (GUI.Button(Rect(Screen.width-200,Screen.height-100,200,100),TouchObj)) {
    		GameObject.Find("teapot").renderer.enabled = true;
    		this.obEnable = false;
    		this.backEnable = true;
    	}
    }
    if (this.backEnable){
    	if (GUI.Button(Rect(0,0,200,100),HideObj)) {
			GameObject.Find("teapot").renderer.enabled = false;
			this.obEnable = true;
			this.backEnable = false;
		}   	
    }
}