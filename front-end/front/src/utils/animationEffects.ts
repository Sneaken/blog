(function() {
  const fnTextPopup = function(arr: string | any[]) {
    // arr参数是必须的
    if (!arr || !arr.length) {
      return;
    }
    // 主逻辑
    let index = 0;
    document.documentElement.addEventListener('click', function(
      event: MouseEvent,
    ) {
      const x = event.pageX,
        y = event.pageY;
      const eleText = document.createElement('span');
      eleText.className = 'text-popup';
      this.appendChild(eleText);
      // innerText 全浏览器支持 textContent IE8不支持
      if (arr[index]) {
        eleText.innerHTML = arr[index];
      } else {
        index = 0;
        eleText.innerText = arr[0];
      }
      // 动画结束后删除自己
      eleText.addEventListener('animationend', function() {
        eleText.parentNode!.removeChild(eleText);
      });
      // 位置
      eleText.style.left = x - eleText.clientWidth / 2 + 'px';
      eleText.style.top = y - eleText.clientHeight + 'px';
      // index递增
      index++;
    });
  };

  fnTextPopup([
    '富强',
    '民主',
    '文明',
    '和谐',
    '自由',
    '平等',
    '公正',
    '法治',
    '爱国',
    '敬业',
    '诚信',
    '友善',
  ]);
})();
