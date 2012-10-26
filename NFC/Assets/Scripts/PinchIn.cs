using UnityEngine;
using System.Collections;

public class PinchIn : MonoBehaviour {
//z座標の許容範囲
public float zMin = 5.0f;
public float zMax = 25.0f;
//直前の2点間の距離
private float backDist = 0.0f;
// Use this for initialization
	void Start () {

	}

// Update is called once per frame
	void Update () {
		if(Input.touchCount >= 2){
			Touch t1 = Input.GetTouch(0);
			Touch t2 = Input.GetTouch(1);
			// 2点タッチ開始時の距離を記憶
			if(t2.phase == TouchPhase.Began){
				backDist = Vector2.Distance(t1.position, t2.position);
			}
			// ピンチイン・アウト
			else if(t1.phase == TouchPhase.Moved && t2.phase == TouchPhase.Moved){
				float newDist = Vector2.Distance(t1.position, t2.position);
				float transZ = (backDist - newDist) / 10.0f;
				if(transZ != 0){
					Vector3 newPos = transform.localPosition;
					newPos.z += transZ;
					//zMin～zMaxの範囲内のみ
					if(zMin <= newPos.z && newPos.z <= zMax){
						transform.localPosition = newPos;
						backDist = newDist;
					}
				}
			}
		}
	}
}
