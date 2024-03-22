
//古の関数
function keyboard_random(key){
    const dx=[1,-1,0,];
    const dy=[1,-1,0,];
    let key_flag=isUpperCase(key);
    q_key=key;
    if(key_flag){q_key=key.toLowerCase();}
    const keyboardRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];  
    for(i=0; i<3; i++){
        for(j=0; j<keyboardRows[i].length; j++){
            if(key==keyboardRows[i][j]){
                y=i;
                x=j;
            }
        }
    }
    rand_y=Math.floor(Math.random() * 4);
    rand_x=Math.floor(Math.random() * keyboardRows[rand_y].length);
    result=[];
    for(i in dx){
        //console.log(keyboardRows[rand_y][rand_x], rand_y,rand_x);
        for(j in dy){
            dx_tmp=dx[i];
            dy_tmp=dy[j];
            if(dy_tmp==0 && dx_tmp==0){continue}
            if(y+dy_tmp>=0 && y+dy_tmp<4 &&
            dx_tmp+x<keyboardRows[y+dy_tmp].length && dx_tmp+x>=0 ){
                result.push(keyboardRows[y+dy_tmp][dx_tmp+x]);
                console.log(result)
            }
        }
    }
    result_rand=Math.floor(Math.random()*result.length);
    if(key_flag && result[result_rand] >= 'a' && result_rand <= 'z'){
        return result[result_rand].isUpperCase;
    }
    return result[result_rand]
}