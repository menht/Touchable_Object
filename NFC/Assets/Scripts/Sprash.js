#pragma strict
var mainmenuSkin : GUISkin;

function Start () {

}

function Update () {
	if(Input.GetMouseButtonDown(0)){
		//マウスがクリックされた
		if (Application.loadedLevelName == "Sprash") {
			//現在シーン１を表示中なので，シーン２に切り替える
			Application.LoadLevel("ProtoType");
		}
	}
}

function OnGUI () {
	GUI.Box(Rect(Screen.width*1/2-200,Screen.height*1/2,400,25), "スマートフォンをNFCタグにかざしてください。");
}