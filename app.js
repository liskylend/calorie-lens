(function(){
  var base=[{title:'美式咖啡',detail:'大杯 · 无糖',kcal:18,time:'08:42'}];
  var meals=[];
  try { meals=JSON.parse(localStorage.getItem('lensMeals')||'null')||base; } catch(e) { meals=base; }
  function byId(id){ return document.getElementById(id); }
  function render(){
    var total=meals.reduce(function(sum,item){ return sum+item.kcal; },0);
    byId('total').textContent=String(total);
    byId('remain').textContent='还剩 '+Math.max(0,1850-total)+' kcal';
    byId('pct').textContent=Math.min(100,Math.round(total/1850*100))+'%';
    var html=meals.map(function(m){ return '<div class="meal"><div class="thumb">⌁</div><div class="info"><div class="name">'+m.title+'</div><div class="detail">'+m.detail+'</div></div><div class="stat"><b>'+m.kcal+'</b><small>kcal · '+m.time+'</small></div></div>'; }).join('');
    byId('meals').innerHTML=html;
    byId('historyList').innerHTML=html||'<div class="placeholder"><h2>还没有记录</h2><p>拍下今天的第一餐吧。</p></div>';
  }
  window.tab=function(name){ ['home','history','profile'].forEach(function(id){byId(id).classList.toggle('hide',id!==name);}); ['Home','History','Profile'].forEach(function(id){byId('n'+id).classList.toggle('active',id.toLowerCase()===name);}); render(); };
  window.openCam=function(){byId('cam').classList.remove('hide');};
  window.closeCam=function(){byId('cam').classList.add('hide');};
  window.pick=function(event){var file=event.target.files&&event.target.files[0];if(!file)return;byId('photo').src=URL.createObjectURL(file);closeCam();byId('prev').classList.remove('hide');};
  window.retry=function(){byId('prev').classList.add('hide');openCam();};
  window.result=function(){byId('prev').classList.add('hide');byId('res').classList.remove('hide');};
  window.closeRes=function(){byId('res').classList.add('hide');};
  window.confirmMeal=function(){meals.unshift({title:'照烧鸡腿饭',detail:'鸡腿 · 米饭 · 西兰花',kcal:628,time:new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})});try{localStorage.setItem('lensMeals',JSON.stringify(meals));}catch(e){}closeRes();tab('home');};
  render();
})();
