//要生成更多的雪花，且随机生成他们的位置和大小
//每隔一段时间动态生成一个雪花
document.addEventListener(
    "DOMContentLoaded", () => {
    let snowflakeGenerator;
    function createSnowflake(){
        //创建新div元素
        const snowflake=document.createElement('div');
        const maxsonwflake=200;
        const maxSize=30;
        const mediumSize=15;
        const minSize=5;
        const size=Math.random()*(maxSize-minSize)+5;
        snowflake.className='snowflake';//添加类名

        //初始样式（随机位置和大小）
        snowflake.innerHTML='❄';//雪花符号
        snowflake.style.left=Math.random()*window.innerWidth+'px';
        snowflake.style.width = `${size}px`;//只在❄符号时作用
        snowflake.style.height = `${size}px`;
        snowflake.style.fontSize = `${size}px`; 
        
        //出现在页面，动态效果
        document.body.appendChild(snowflake);
        animateSnowflake(snowflake);
    }

    //飘落效果
    function animateSnowflake(snowflake){
        let top=0;//确保从上顶部飘落
        let fallspeed=Math.random()*1+0.5;//速度
        let opacity=1;//初始透明度
        
        function fall(){
            top+=fallspeed;//更新垂直距离
            opacity-=0.001;
            let sway =Math.sin(top/60)*2;
            snowflake.style.top=top+'px';  
            snowflake.style.opacity=opacity;  // 更新透明度
            
            //飘出页面后删除雪花
            if(opacity<=0||top>window.innerHeight){
                snowflake.remove();
            }else{
                requestAnimationFrame(fall);
            }
        }
        
        fall();
    }

    snowflakeGenerator=setInterval(createSnowflake,200);

    //解决退出页面雪花积累问题
    document.addEventListener('visibilitychange',()=>{
        if(document.visibilityState == 'visible'){
            //页面可见时继续生成雪花
            snowflakeGenerator=setInterval(createSnowflake,200);
        }else{
            //页面不可见时停止生成雪花
            clearInterval(snowflakeGenerator);
            document.querySelectorAll('.snowflake').forEach(snowflake=>snowflake.remove());
        }
    });
});
