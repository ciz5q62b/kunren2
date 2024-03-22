// JSONファイルのパス
const jsonFilePath = './JSON/mock2.json';
const SVGelement = document.getElementById("SVGViewer");
let checkbox = document.getElementById('myCheckbox');
let timer
let Random_flag=false
// JSONファイルを取得し、変数に代入する関数
let miss_key={
    ID: 0,
    code1: 0,
    code2: 0,
    denwa: 0,
    email: 0}

let FormData_key={ 
        ID:"",
        code1:"",
        code2: "",
        denwa: "",
        email:""
          }


async function fetchAndAssignJSONFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON file: ${filePath}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}


// JSONファイルを取得し、グローバル変数に代入する
fetchAndAssignJSONFile(jsonFilePath)
    .then(data => {
        // fetch リクエストが完了した後にデータを処理する
        ans2 = data;
    })
    .catch(error => console.error('Failed to fetch data:', error));


//問題の文字列をシャッフルする関数
function arrayShuffle2(list){
    if(list.length==1){
        return list
    }
    //文字列を配列化
    str_list=[...list];
    console.log(str_list)
    r = Math.floor(Math.random() * (str_list.length-1))
    for(let i=0; i<2; i++){
        r = Math.floor(Math.random() * (str_list.length-1))+1    
        r2 = Math.floor(Math.random() * (
            str_list.length-1))+1
        
        if(str_list[r]=="@" || str_list[r2]=="@"
        || str_list[r]=="." || str_list[r2]=="."  
        || str_list[r]=="-" || str_list[r2]=="-"){
            continue;
        }
        str_tmp=str_list[r]
        str_list[r]=str_list[r2]
        str_list[r2]=str_tmp
    }
    resulet=str_list.join("")
    return resulet
}

function arrayShuffle(array) {
    //=arrayだとarrayの値のほうも変わるので、浅い処理にする。
    array_tmp=[...array]
    for(let i = (array_tmp.length - 1); 0 < i; i--){     
        // 0〜(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i+1));
        // 要素の並び替えを実行
        let tmp = array_tmp[i];
        array_tmp[i] = array[r];
        array_tmp[r] = tmp;
        }
    return array_tmp;
      }

function draw(list){
    let tmp=list
    SVGsrc="./SVG/kokyaku/"+list["ID"]+".svg";
    SVGelement.src=SVGsrc;
    $("#ID").find(".custom-text-style").text("ID:" + list["ID"]).css("font-size", "26px");
    for(key in list){
        key_tmp="#"+key
        resulet=arrayShuffle2(tmp[key])
        document.getElementById(key).value =resulet
    }
    return
}

function endMove(){
    //、ここに追加の処理を記述
    clearInterval(timer);

    for(key in FormData_key){
        let tmp="#"+key
        $("label[for='" + key + "']").css("border", "none");
    }
    alert(count+'枚完了');
    $('#count').text("顧客伝票チェック");
    $('#surveyForm').hide();
    $('#SVGContainer').hide()
    $('#remainingTime').hide();
    $("#kekka").show()
    resulet_key={
        code1: "顧客コード",
        code2: "商品コード",
        denwa: "電話番号",
        email: "メールアドレス"}
    var outputDiv = document.getElementById("kekka");
    html=""
    html='<h1>結果発表</h1><h2>枚数: ' + count + '枚</h2>'
    
    for(key in miss_key){
        if(miss_key[key]>0){
            html+="<p>" + resulet_key[key]+":"+miss_key[key]+ '箇所</p>'
        }
    }
    html+='<button onclick="kekkahidden()" id="kekka1" class="btn btn-primary mt-3">戻る</button>'
    
    outputDiv.innerHTML = html;
    miss_key={
        ID: 0,
        code1: 0,
        code2: 0,
        denwa: 0,
        email: 0}
        
    }

checkbox.addEventListener('change', function() {
        // チェックボックスの状態をboolean変数に反映させる
        Random_flag = this.checked;
    });

$(document).ready(function() {
        $('#timeForm').submit(function(event) {
            count=0
            $('#count').text("顧客伝票チェック")
            event.preventDefault();
            var inputTimeMinute = parseInt($('#timeInputMinute').val());
            var inputTime = inputTimeMinute * 60; // 入力時間を秒に変換
            if(Random_flag){
                for(let i=0; i<ans2.length; i++){
                    ans_result=arrayShuffle(ans2)
                }
            }else{
                ans_result=ans2
            }
            
            ans_table=ans_result[count]           
            draw(ans_table)
         
            console.log(ans_table["ID"])
            if (inputTime > 0) {
                // 入力可能な時間が設定された場合、スタート画面を非表示にしてデータ入力フォームを表示
                $('#surveyForm').show();
                $('#remainingTime').show();
                $('#timeForm').hide();
                $('#SVGContainer').show() 
                // 残り時間を表示する
                var remainingTime = inputTime;
                $('#remainingTime').text('残り時間：' + Math.floor(remainingTime / 60) + '分' + remainingTime % 60 + '秒');
                
    
                // 残り時間を更新する関数を定義し、1秒ごとに実行する
                timer = setInterval(function() {
                    remainingTime--;
                    $('#remainingTime').text('残り時間：' + Math.floor(remainingTime / 60) + '分' + remainingTime % 60 + '秒');
                    if (remainingTime <= 0) {
                        //初期化
                        // 時間が経過した場合
                        endMove();
            }}, 1000); // 1秒ごとに更新
            } else {
                alert('入力可能な時間を正しく設定してください。');
            }
        });
    });
function kekkahidden(){
    for(key in FormData_key){
        $("label[for='" + key + "']").css("border", "none");
    }
        $("#timeForm").show()
        $("#kekka").hide()
    }

function check(ans_key,FormData_key){
    for(var key in ans_key){
        if(FormData_key[key]=="" || FormData_key==undefined || FormData_key==null){
            return false
        }
    }
    let flag=true
    for (var key in ans_key) {
        if (ans_key[key] !== FormData_key[key]) {
           // $("#" + key).css("border", "3px groove red");
            $("label[for='" + key + "']").css("border-bottom", "3px groove red");
            miss_key[key]=miss_key[key]+1;
            flag=false
        } else {   
            $("label[for='" + key + "']").css("border", "none");
        }
    }
    return flag    
}
function stop(){
    endMove()

}

$(document).ready(function() {  $("#surveyForm").submit(function(event) {
        // フォームの送信をキャンセル
        event.preventDefault();
        // 入力された値の辞書
        FormData_key={ 
        ID: ans_table["ID"],
        code1:$("#code1").val(),
        code2: $("#code2").val(),
        denwa: $("#denwa").val(),
        email: $("#email").val()
          }
      
        console.log(FormData_key)
        ans_key={
        ID: "",
        code1: "",
        code2: "",
        denwa: "",
        email: ""}
        for(key in ans_table){
           ans_key[key]=ans_table[key];
        }
        //答えのロジック
        if(check(ans_key,FormData_key)){
            count+=1
            ans_table=ans_result[count%ans_result.length]
            $('#count').text("顧客伝票チェック 現在："+count+"枚目")
            for(key in FormData_key){
                let tmp="#"+key
                $(tmp).val("");
            }
            draw(ans_table)
            $("#ID").find(".custom-text-style").text("ID:" + ans_table["ID"]).css("font-size", "26px");
            
        }
        console.log(miss_key)       
    });
});
