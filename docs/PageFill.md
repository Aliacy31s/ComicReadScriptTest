## 页面填充

日漫一般奇数页在左，偶数页在右，所以为了保证左右页的位置正确，默认会在第1页填充进一个空白页用以填补右页的空白。如果之后的图片流顺序正确的话，也只需要如此即可保证左右正确。
但因为各种各样的原因——汉化组删掉了单行本中间的空白页、将跨页图分成了左图全图右图三张图、作者在第一页的右页写了序所以也被放了进来等——导致图片流的左右页顺序乱掉，为了之后左右页能正确显示，就必须使用页面填充功能手动加上填充页。

TODO: 配图，对比图

| ❌ | ✔️ |
| ---- | ---- |
| 左右 | 左右 |
| 右左 | 左右 |
| 右左 | 左右 |
| 右左 | 左右 |
| 图 | 图 |

如果图片流中没有出现跨页大图，那「页面填充」的影响范围就是整个图片流；如果出现了一张跨页大图，以跨页大图为分割点，「页面填充」的影响范围将被分为两个。以此类推，图片流中出现的跨页大图将整个图片流分割为多块独立的流。通过侧边栏的页面填充按钮可以查看和修改当前流的「页面填充」的状态。

TODO: 配图

左页, 右页
左页, 右页 <- 在这里切换「页面填充」只会在第一页增加填充页，下面跨页之后的左右顺序不受影响
  跨页图
左页, 右页
左页, 右页

## 如何判断页面的左右页位置是否正确

1. 页数: 如果页数没被汉化组处理掉的话，直接将漫画页数调整到左奇右偶即可~~不过一般漫画的页数都会被处理掉~~
2. 中缝: 如果漫画的图源和汉化组都没有对漫画四周的白边进行剪裁的话，在漫画顺序正确的情况下中间会有比较大的白边——书的中缝
3. 页边: 有些漫画会在页边放有注释、广告之类的东西，这个是只会出现在左右两边，不会放在中缝上的
4. 画格: 因为中缝的存在，如果画格有开口，那这个开口99%的情况下都是对着页边的

![判断左右页位置例图](/images/判断左右页位置例图.png)

4. 经验: 一些杂志——比如百合姬——上刊载的漫画会在第一页的右页放剧情梗概和角色介绍，如果汉化组有汉化这页，那这页本身就算是填充页了，不需要开「页面填充」。但如果之后换了汉化组不再汉化这页了，那就肯定得开启了

![百合姬简介页例图](/images/百合姬简介页例图.png)

5. 感觉: 漫画看多了后就能在左右顺序出错时感觉到违和感，在看的时候感觉好像这页应该在翻页后再出现会更好，不过这个因为是纯凭感觉所以并不能100%肯定。不过，一些作者在创作时就会考虑到翻页这一动作，会特意调整页面的位置来利用翻页制造悬念、冲击或转折，让读者在翻开下一页时产生惊喜或震撼，也会用来切换场景或时间，让故事更流畅和连贯。

![翻页分镜例图1](/images/翻页分镜例图1.png)
![翻页分镜例图2](/images/翻页分镜例图2.png)